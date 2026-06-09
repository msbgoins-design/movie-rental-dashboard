export interface Rental {
  id: number;
  customer: string;
  movie: string;
  genre: string;
  daysRented: number;
  dailyRate: number;
  isReturned: boolean;
  membershipTier: string;
  cost?: number;
}

export interface RentalReport {
  totalReturned: number;
  totalRevenue: number;
  mostExpensive: { customer: string; movie: string; cost: number } | null;
  returnedRentalsList: Rental[];
}

// 1. Filter to only rentals that have been returned
export const getReturnedRentals = (rentals: Rental[]): Rental[] => {
  return rentals.filter((rental) => rental.isReturned);
};

// 2. Calculate rental cost based on membership tiers
export const calculateRentalCost = (
  rental: Rental
): Rental & { cost: number } => {
  let baseCost = rental.daysRented * rental.dailyRate;
  let discount = 0;

  if (rental.membershipTier === "gold") {
    discount = 0.2;
  } else if (rental.membershipTier === "silver") {
    discount = 0.1;
  }

  const finalCost = parseFloat((baseCost * (1 - discount)).toFixed(2));
  return { ...rental, cost: finalCost };
};

// 3. Take an array of rentals and return the total cost
export const getTotalRevenue = (
  rentalsWithCost: (Rental & { cost: number })[]
): number => {
  const total = rentalsWithCost.reduce((sum, rental) => sum + rental.cost, 0);
  return parseFloat(total.toFixed(2));
};

// 4. Return only rentals matching a specific genre
export const getGenreRentals = (genre: string, rentals: Rental[]): Rental[] => {
  return rentals.filter(
    (rental) => rental.genre.toLowerCase() === genre.toLowerCase()
  );
};

// Orchestrator: Generate the full report data
export const getRentalReport = (rentals: Rental[]): RentalReport => {
  const returned = getReturnedRentals(rentals);
  const returnedWithCosts = returned.map(calculateRentalCost);
  const totalRevenue = getTotalRevenue(returnedWithCosts);

  let mostExpensive = null;
  if (returnedWithCosts.length > 0) {
    const highest = returnedWithCosts.reduce((prev, current) =>
      prev.cost > current.cost ? prev : current
    );
    mostExpensive = {
      customer: highest.customer,
      movie: highest.movie,
      cost: highest.cost,
    };
  }

  return {
    totalReturned: returnedWithCosts.length,
    totalRevenue,
    mostExpensive,
    returnedRentalsList: returnedWithCosts,
  };
};
