import { BsSearch } from "react-icons/bs";
import AdminSidebar from "../../components/Admin/AdminSidebar";
import { FaRegBell } from "react-icons/fa";
import { HiTrendingDown, HiTrendingUp } from "react-icons/hi";
import { BarChart, DoughnutChart } from "../../components/Admin/Charts";
import { BiMaleFemale } from "react-icons/bi";
import TableHOC from "../../components/Admin/TableHOC";

const userImg =
  "https://thumbs.dreamstime.com/b/faceless-businessman-avatar-man-suit-blue-tie-human-profile-userpic-face-features-web-picture-gentlemen-85824471.jpg";

const Dashboard = () => {
  return (
    <div className="flex">
      <AdminSidebar />
      <main className="w-full p-1 bg-gray-100 px-5">
        <div className="flex sm:pl-12 lg:pl-0 items-center justify-between bg-transparent px-4 py-3 border-b-2 border-gray-400">
          {/* Search Bar */}

          <BsSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Search for data, users, docs"
            className="flex-1 bg-transparent outline-none w-full px-3"
          />

          {/* User Profile Section */}
          <div className="flex items-center gap-6">
            <button className="relative hover:opacity-80">
              <FaRegBell size={20} className="text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                2
              </span>
            </button>
            <img
              src={userImg}
              alt="User Profile"
              className="w-10 h-10 rounded-full object-cover cursor-pointer"
            />
          </div>
        </div>

        {/* widgets container */}
        <section className="mt-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-10 lg:gap-8">
            <WidgetItem
              percent={40}
              amount={true}
              value={340000}
              heading="Revenue"
              color="rgb(0,115,255)"
            />
            <WidgetItem
              percent={-14}
              amount={false}
              value={400}
              heading="Users"
              color="rgb(0,198,202)"
            />
            <WidgetItem
              percent={80}
              amount={false}
              value={23}
              heading="Transactions"
              color="rgb(255,196,0)"
            />
            <WidgetItem
              percent={30}
              amount={false}
              value={120}
              heading="Products"
              color="rgb(76,0,255)"
            />
          </div>
        </section>

        {/* graph container */}
        <section className="flex md:flex-row flex-col gap-5 mt-8">
          <div className="bg-white  md:w-[70%] lg:w-[78%] rounded-lg shadow-sm p-6 ">
            <h2 className="md:text-2xl sm:text-xl text-lg  uppercase text-gray-500 text-center py-4 ">
              Revenue & Transaction
            </h2>
            <BarChart
              data_1={[300, 144, 433, 655, 237, 755, 190]}
              data_2={[200, 444, 343, 556, 778, 455, 990]}
              title_1="Revenue"
              title_2="=Transaction"
              bgColor_1="rgb(0,115,255)"
              bgColor_2="rgb(53,162,235,0.8)"
            />
          </div>
          <div className="bg-white md:w-[30%] lg:w-[22%] rounded-lg shadow-sm p-6">
            <h2 className="text-2xl  uppercase text-gray-500 text-center py-4 ">
              Inventory
            </h2>
            <div className="flex flex-col gap-4">
              <CategoryItem
                heading="Laptops"
                value={70}
                color="hsl(69,100%,50%)"
              />
              <CategoryItem
                heading="Shoes"
                value={80}
                color="hsl(180,100%,50%)"
              />
              <CategoryItem
                heading="Cameras"
                value={45}
                color="hsl(240,100%,50%)"
              />
              <CategoryItem
                heading="Jeans"
                value={35}
                color="hsl(300,100%,50%)"
              />
            </div>
          </div>
        </section>

        {/* transaction chart */}
        <section className="flex sm:flex-row flex-col gap-5 mt-8">
          <div className="bg-white rounded-lg shadow-sm p-4 pt-0 w-full sm:max-w-[220px]">
            <h2 className="text-xl text-gray-700 uppercase text-center py-4 ml-5">
              Gender Ratio
            </h2>
            <div className="relative w-48 h-48 mx-auto">
              <DoughnutChart
                labels={["Female", "Male"]}
                data={[12, 19]}
                backgroundColor={["hsl(340,82%,56%)", "rgba(53,162,235,0.8)"]}
                cutout={70}
              />
              <BiMaleFemale
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                size={24}
                color="#555"
              />
            </div>
            <div className="flex justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[hsl(340,82%,56%)]" />
                <p className="text-xs text-gray-600">Female (39%)</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[rgba(53,162,235,0.8)]" />
                <p className="text-xs text-gray-600">Male (61%)</p>
              </div>
            </div>
          </div>
          <TableHOC />
        </section>
      </main>
    </div>
  );
};

// inventroy
interface CategoryItemProps {
  color: string;
  value: number;
  heading: string;
}

const CategoryItem = ({ color, value, heading }: CategoryItemProps) => (
  <div className="flex items-center justify-between">
    <h5 className=" flex-1 text-gray-700">{heading}</h5>
    <div className=" h-2 flex-1 rounded-full bg-gray-200 mr-2">
      <div
        style={{
          backgroundColor: color,
          width: `${value}%`,
        }}
        className="h-full rounded-full transition-all duration-300"
      />
    </div>
    <span className="text-sm flex-1 md:flex-none text-center md:text-start  text-gray-600">{value}%</span>
  </div>
);

// widget
interface WidgetProps {
  heading: string;
  value: number;
  percent: number;
  color: string;
  amount?: boolean;
}

const WidgetItem = ({
  heading,
  value,
  percent,
  color,
  amount,
}: WidgetProps) => {
  return (
    <article className="p-6 bg-white rounded-lg shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold text-gray-700 text-lg">{heading}</p>
          <h4 className="mt-4 font-bold text-2xl">
            {amount ? `₹${value.toLocaleString()}` : value}
          </h4>
          <p
            className={`mt-2 flex items-center gap-1 text-sm ${
              percent > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {percent > 0 ? <HiTrendingUp /> : <HiTrendingDown />}
            {percent}%
          </p>
        </div>
        <span
          className="rounded-full w-16 h-16"
          style={{
            background: `conic-gradient(
                ${color} ${Math.abs(percent)}%,
                rgb(255, 255, 255) 0
              )`,
          }}
        />
      </div>
    </article>
  );
};

export default Dashboard;
