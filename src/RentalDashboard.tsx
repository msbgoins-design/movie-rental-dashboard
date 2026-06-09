import React from "react";
import {
  getRentalReport,
  getGenreRentals,
  calculateRentalCost,
  Rental,
} from "./rentalUtils";
import MetricCard from "./MetricCard";
//Customer data
const rentalsData: Rental[] = [
  {
    id: 1,
    customer: "Alex",
    movie: "Inception",
    genre: "Sci-Fi",
    daysRented: 3,
    dailyRate: 4.99,
    isReturned: true,
    membershipTier: "gold",
  },
  {
    id: 2,
    customer: "Jordan",
    movie: "The Dark Knight",
    genre: "Action",
    daysRented: 5,
    dailyRate: 3.99,
    isReturned: false,
    membershipTier: "silver",
  },
  {
    id: 3,
    customer: "Sam",
    movie: "Interstellar",
    genre: "Sci-Fi",
    daysRented: 2,
    dailyRate: 4.99,
    isReturned: true,
    membershipTier: "none",
  },
  {
    id: 4,
    customer: "Taylor",
    movie: "The Notebook",
    genre: "Romance",
    daysRented: 7,
    dailyRate: 2.99,
    isReturned: true,
    membershipTier: "gold",
  },
  {
    id: 5,
    customer: "Morgan",
    movie: "Oppenheimer",
    genre: "Drama",
    daysRented: 4,
    dailyRate: 4.99,
    isReturned: false,
    membershipTier: "silver",
  },
  {
    id: 6,
    customer: "Casey",
    movie: "Dunkirk",
    genre: "Action",
    daysRented: 3,
    dailyRate: 3.99,
    isReturned: true,
    membershipTier: "none",
  },
];

const RentalDashboard: React.FC = () => {
  const report = getRentalReport(rentalsData);

  // Genre specific lookups (Filtering all rentals by genre, then applying costs)
  const romanceRentals = getGenreRentals("Romance", rentalsData).map(
    calculateRentalCost
  );
  const dramaRentals = getGenreRentals("Drama", rentalsData).map(
    calculateRentalCost
  );
  const sciFiRentals = getGenreRentals("Sci-Fi", rentalsData).map(
    calculateRentalCost
  );
  const actionRentals = getGenreRentals("Action", rentalsData).map(
    calculateRentalCost
  );

  // Helper function to map genres to icons
  const getGenreIcon = (genre: string) => {
    switch (genre.toLowerCase()) {
      case "romance":
        return "❤️";
      case "sci-fi":
        return "🛸";
      case "action":
        return "🎬";
      case "drama":
        return "🎭";
      default:
        return "🍿";
    }
  };

  return (
    <div className="container py-5">
      <h1
        className="text-center mb-5 text-white font-weight-bold"
        style={{ letterSpacing: "1px" }}
      >
        🎥 Movie Rental Dashboard
      </h1>

      {/* Main Metrics Row-Cards */}
      <div className="row g-4 mb-5 justify-content-center">
        <div className="col-sm-6 col-md-4">
          <MetricCard
            title="Total Returned"
            value={report.totalReturned}
            borderColorClass="neon-pink"
          />
        </div>
        <div className="col-sm-6 col-md-4">
          <MetricCard
            title="Total Revenue"
            value={`$${report.totalRevenue}`}
            borderColorClass="neon-blue"
          />
        </div>
        <div className="col-sm-6 col-md-4">
          <MetricCard
            title="Most Expensive"
            value={
              report.mostExpensive ? `$${report.mostExpensive.cost}` : "$0.00"
            }
            subtitle={
              report.mostExpensive
                ? `Top Spender: ${report.mostExpensive.customer}`
                : "No data"
            }
            borderColorClass="neon-purple"
          />
        </div>
      </div>

      {/* Genre Analytics Section */}
      <h2 className="text-white mb-4 h4">📊 Genre Analytics</h2>
      <div className="row g-4 mb-5">
        <div className="col-md-3">
          <MetricCard
            title="Sci-Fi Rentals"
            value={`${getGenreIcon("Sci-Fi")} ${sciFiRentals.length}`}
            subtitle={`Rev: $${sciFiRentals
              .reduce((sum, r) => sum + r.cost, 0)
              .toFixed(2)}`}
            borderColorClass="neon-blue"
          />
        </div>
        <div className="col-md-3">
          <MetricCard
            title="Action Rentals"
            value={`${getGenreIcon("Action")} ${actionRentals.length}`}
            subtitle={`Rev: $${actionRentals
              .reduce((sum, r) => sum + r.cost, 0)
              .toFixed(2)}`}
            borderColorClass="neon-purple"
          />
        </div>
        <div className="col-md-3">
          <MetricCard
            title="Romance Box"
            value={`${getGenreIcon("Romance")} ${romanceRentals.length}`}
            subtitle={`Rev: $${romanceRentals
              .reduce((sum, r) => sum + r.cost, 0)
              .toFixed(2)}`}
            borderColorClass="neon-pink"
          />
        </div>
        <div className="col-md-3">
          <MetricCard
            title="Drama Box"
            value={`${getGenreIcon("Drama")} ${dramaRentals.length}`}
            subtitle={`Rev: $${dramaRentals
              .reduce((sum, r) => sum + r.cost, 0)
              .toFixed(2)}`}
            borderColorClass="neon-orange"
          />
        </div>
      </div>

      {/* Ledger Table */}
      <h2 className="text-white mb-4 h4">📝 Returned Rentals Ledger</h2>
      <div
        className="table-responsive shadow-sm"
        style={{ borderRadius: "8px", overflow: "hidden" }}
      >
        <table className="table table-dark table-hover align-middle mb-0">
          <thead className="table-secondary text-dark text-uppercase small font-weight-bold">
            <tr>
              <th>Customer</th>
              <th>Movie</th>
              <th>Genre</th>
              <th>Days Rented</th>
              <th>Total Cost</th>
            </tr>
          </thead>
          <tbody>
            {report.returnedRentalsList.map((rental) => (
              <tr key={rental.id}>
                <td className="font-weight-bold text-white">
                  {rental.customer}
                </td>
                <td className="text-white">{rental.movie}</td>
                <td>
                  <span className="me-2">{getGenreIcon(rental.genre)}</span>
                  {rental.genre}
                </td>
                <td>{rental.daysRented} days</td>
                <td className="text-success font-weight-bold">
                  ${rental.cost?.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RentalDashboard;
