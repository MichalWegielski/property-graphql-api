import { prisma } from "../../lib/prisma.js";
import { fetchCurrentWeather } from "../../lib/weatherstack.js";
import {
  createPropertyInput,
  propertyFilterInput,
} from "./property.validation.js";
import { GraphQLError } from "graphql";

export type SortOrder = "asc" | "desc";

export type PropertyFilter = {
  city?: string;
  state?: string;
  zipCode?: string;
};

export async function listProperties(args: {
  filter?: PropertyFilter;
  sort?: SortOrder;
}) {
  // Validate filter
  try {
    if (args.filter) propertyFilterInput.parse(args.filter);
  } catch (_err) {
    throw new GraphQLError("Invalid filter", {
      extensions: { code: "BAD_USER_INPUT" },
    });
  }

  const where: any = {};
  if (args.filter?.city) {
    where.city = { contains: args.filter.city, mode: "insensitive" };
  }
  if (args.filter?.state) {
    where.state = { equals: args.filter.state };
  }
  if (args.filter?.zipCode) {
    where.zipCode = { equals: args.filter.zipCode };
  }

  const orderBy = { createdAt: args.sort ?? "asc" } as const;
  return prisma.property.findMany({ where, orderBy });
}

export async function getProperty(id: string) {
  return prisma.property.findUnique({ where: { id } });
}

export async function createProperty(args: {
  city: string;
  street: string;
  state: string;
  zipCode: string;
}) {
  // Validate input
  try {
    createPropertyInput.parse(args);
  } catch (_err) {
    throw new GraphQLError("Invalid input", {
      extensions: { code: "BAD_USER_INPUT" },
    });
  }

  // External API call with guarding
  let weather: { lat: number; long: number; current: unknown };
  try {
    weather = await fetchCurrentWeather({
      city: args.city,
      state: args.state,
      zipCode: args.zipCode,
    });
  } catch (_err) {
    throw new GraphQLError("Weather service error", {
      extensions: { code: "EXTERNAL_API_ERROR" },
    });
  }

  return prisma.property.create({
    data: {
      city: args.city,
      street: args.street,
      state: args.state,
      zipCode: args.zipCode,
      lat: weather.lat,
      long: weather.long,
      weatherData: weather.current as any,
    },
  });
}

export async function deleteProperty(id: string) {
  try {
    await prisma.property.delete({ where: { id } });
    return true;
  } catch (_err) {
    return false;
  }
}
