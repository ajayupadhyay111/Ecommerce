import AdminSidebar from "../../components/Admin/AdminSidebar";
import { DoughnutChart, PieChart } from "../../components/Admin/Charts";
import { categories } from "../../assets/data.json";

const PieCharts = () => {
  return (
    <div className="flex">
      <AdminSidebar />
      <main className="w-full p-8">
        <h1>Pie & Dougnut Charts</h1>
        <section className="bg-white rounded-lg p-6 mb-6">
          <div className="w-96 mx-auto">
            <PieChart
              labels={["Processing", "Shipped", "Delivered"]}
              data={[12, 9, 13]}
              backgroundColor={[
                `hsl(110,80%,80%)`,
                `hsl(110,80%,50%)`,
                `hsl(110,40%,80%)`,
              ]}
              offset={[0, 0, 40]}
            />
          </div>
          <h2 className="text-xl uppercase text-gray-700 text-center">
            Order Fulfillment Ratio
          </h2>
        </section>

        <section className="bg-white rounded-lg p-6 mb-6">
          <div className="w-full max-w-md mx-auto h-[400px] flex items-center justify-center">
            <DoughnutChart
              labels={categories.map((i) => i.heading)}
              data={categories.map((i) => i.value)}
              backgroundColor={categories.map(
                (i) => `hsl(${i.value * 4},${i.value}%,50%)`
              )}
              legends={false}
              offset={[0, 0, 0, 80]}
            />
          </div>
          <h2 className="text-xl py-2 uppercase text-gray-700 text-center">
            Product categories Ratio
          </h2>
        </section>
        <section className="bg-white rounded-lg p-6 mb-6">
          <div className="w-full max-w-md mx-auto h-[400px] flex items-center justify-center">
            <DoughnutChart
              labels={["In Stock", "Out Of Stock"]}
              data={[40, 20]}
              backgroundColor={["hsl(269,80%,40%)", "rgb(53, 162, 255)"]}
              legends={false}
              offset={[0, 80]}
              cutout={"70%"}
            />
          </div>
          <h2 className="text-xl py-2 uppercase text-gray-700 text-center">
            Stock Availability
          </h2>
        </section>
        <section className="bg-white rounded-lg p-6 mb-6">
          <div className="w-full max-w-md mx-auto h-[400px] flex items-center justify-center">
            <DoughnutChart
              labels={[
                "Marketing Cost",
                "Discount",
                "Burnt",
                "Production Cost",
                "Net Margin",
              ]}
              data={[32, 18, 5, 20, 25]}
              backgroundColor={[
                "hsl(110,80%,40%)",
                "hsl(19,80%,40%)",
                "hsl(69,80%,40%)",
                "hsl(300,80%,40%)",
                "rgb(53, 162, 255)",
              ]}
              legends={false}
              offset={[20, 30, 20, 30, 80]}
            />
          </div>
          <h2 className="text-xl py-2 uppercase text-gray-700 text-center">
            Revenue Distribution
          </h2>
        </section>
        <section className="bg-white rounded-lg p-6 mb-6">
          <div className="w-full max-w-md mx-auto h-[400px] flex items-center justify-center">
            <PieChart
              labels={[
                "Teenager(Below 20)",
                "Adult (20-40)",
                "Older (above 40)",
              ]}
              data={[30, 250, 70]}
              backgroundColor={[
                `hsl(10, ${80}%, 80%)`,
                `hsl(10, ${80}%, 50%)`,
                `hsl(10, ${40}%, 50%)`,
              ]}
              offset={[0, 0, 50]}
            />
          </div>

          <h2 className="text-xl py-2 uppercase text-gray-700 text-center">
            Users Age Group
          </h2>
        </section>
        <section className="bg-white rounded-lg p-6 mb-6">
          <div className="w-full max-w-md mx-auto h-[400px] flex items-center justify-center">
            <DoughnutChart
              labels={["Admin", "Customers"]}
              data={[40, 250]}
              backgroundColor={[`hsl(335, 100%, 38%)`, "hsl(44, 98%, 50%)"]}
              offset={[0, 80]}
            />  
          </div>
        </section>
      </main>
    </div>
  );
};

export default PieCharts;
