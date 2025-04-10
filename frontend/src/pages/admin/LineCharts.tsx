import AdminSidebar from "../../components/Admin/AdminSidebar";
import { LineChart } from "../../components/Admin/Charts";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "Aug", "Sept", "Oct", "Nov", "Dec",
];

const LineCharts = () => {
  return (
    <div className="flex">
      <AdminSidebar />
      <main className="w-full p-8">
        <h1 className="text-2xl font-bold mb-6">Line Charts</h1>
        
        {/* Active Users */}
        <section className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="">
            <LineChart
              data={[200, 444, 444, 556, 778, 455, 990, 1444, 256, 447, 1000, 1200]}
              label="Users"
              borderColor="rgb(53, 162, 255)"
              backgroundColor="rgba(53, 162, 255,0.5)"
              labels={months}
            />
          </div>
          <h2 className="text-xl font-medium text-gray-700 text-center mt-4">
            Active Users
          </h2>
        </section>

        {/* Total Products */}
        <section className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="">
            <LineChart
              data={[40, 60, 244, 100, 143, 120, 41, 47, 50, 56, 32, 45]}
              backgroundColor="hsla(269,80%,40%,0.4)"
              borderColor="hsl(269,80%,40%)"
              label="Products"
              labels={months}
            />
          </div>
          <h2 className="text-xl font-medium text-gray-700 text-center mt-4">
            Total Products (SKU)
          </h2>
        </section>

        {/* Revenue */}
        <section className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="">
            <LineChart
              data={[24000, 14400, 24100, 34300, 90000, 20000, 25600, 44700, 99000, 144400, 100000, 120000]}
              backgroundColor="hsla(129,80%,40%,0.4)"
              borderColor="hsl(129,80%,40%)"
              label="Revenue"
              labels={months}
            />
          </div>
          <h2 className="text-xl font-medium text-gray-700 text-center mt-4">
            Total Revenue
          </h2>
        </section>

        {/* Discount */}
        <section className="bg-white rounded-lg shadow-sm p-6">
          <div className="">
            <LineChart
              data={[9000, 12000, 12000, 9000, 1000, 5000, 4000, 1200, 1100, 1500, 2000, 5000]}
              backgroundColor="hsla(29,80%,40%,0.4)"
              borderColor="hsl(29,80%,40%)"
              label="Discount"
              labels={months}
            />
          </div>
          <h2 className="text-xl font-medium text-gray-700 text-center mt-4">
            Discount Allotted
          </h2>
        </section>
      </main>
    </div>
  );
};

export default LineCharts;