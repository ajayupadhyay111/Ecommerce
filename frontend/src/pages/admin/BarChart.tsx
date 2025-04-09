import React from "react";
import AdminSidebar from "../../components/Admin/AdminSidebar";
import { BarChart } from "../../components/Admin/Charts";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const BarCharts = () => {
  return (
    <div className="flex">
      <AdminSidebar />
      <main className="w-full p-8">
        <section className="bg-white rounded-lg p-6 mb-6">
          <div className="mb-4">
            <BarChart
              data_1={[200, 444, 343, 556, 778, 455, 990]}
              data_2={[300, 144, 433, 655, 237, 755, 190]}
              title_1="Products"
              title_2="Users"
              bgColor_1={`hsl(260,50%,30%)`}
              bgColor_2="hsl(360,90%,90%)"
            />
          </div>
          <h2 className="text-xl font-medium text-gray-700 text-center">
            Top Selling Products & Top Customers
          </h2>
        </section>

        <section className="bg-white rounded-lg  p-6">
          <div className="mb-4">
            <BarChart
              horizontal={true}
              data_1={[200, 444, 343, 556, 778, 455, 990,390,890,909,334,250]}
              data_2={[]}
              title_1="Products"
              title_2=""
              bgColor_1={`hsl(180,40%,50%)`}
              bgColor_2=""
              labels={months}
            />
          </div>
          <h2 className="text-xl font-medium text-gray-700 text-center">
            Orders Throughout The Year
          </h2>
        </section>
      </main>
    </div>
  );
};

export default BarCharts;