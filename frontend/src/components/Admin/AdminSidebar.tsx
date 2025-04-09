import { useEffect, useState } from "react";
import { IconType } from "react-icons";
import { AiFillFileText } from "react-icons/ai";
import {
  FaChartBar,
  FaChartLine,
  FaChartPie,
  FaGamepad,
  FaStopwatch,
} from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { HiMenuAlt4 } from "react-icons/hi";
import { IoIosPeople } from "react-icons/io";
import {
  RiCoupon3Fill,
  RiDashboardFill,
  RiShoppingBag3Fill,
} from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";

type AdminSidebarItemType = {
  name: string;
  path: string;
  Icon: IconType;
};

const AdminSidebar = () => {
  const location = useLocation();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [phoneActive, setPhoneActive] = useState<boolean>(
    window.innerWidth < 1100
  );

  const resizeHandler = () => {
    setPhoneActive(window.innerWidth < 1100);
  };

  useEffect(() => {
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  const dashboardTabs: AdminSidebarItemType[] = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      Icon: RiDashboardFill,
    },
    {
      name: "Products",
      path: "/admin/products",
      Icon: RiShoppingBag3Fill,
    },
    {
      name: "Customers",
      path: "/admin/customers",
      Icon: IoIosPeople,
    },
    {
      name: "Transactions",
      path: "/admin/transactions",
      Icon: AiFillFileText,
    },
  ];
  const chartTabs: AdminSidebarItemType[] = [
    {
      name: "Bar",
      path: "/admin/chart/bar",
      Icon: FaChartBar,
    },
    {
      name: "Pie",
      path: "/admin/chart/pie",
      Icon: FaChartPie,
    },
    {
      name: "Line",
      path: "/admin/chart/line",
      Icon: FaChartLine,
    },
  ];
  const appTabs: AdminSidebarItemType[] = [
    {
      name: "Stopwatch",
      path: "/admin/app/stopwatch",
      Icon: FaStopwatch,
    },
    {
      name: "Coupon",
      path: "/admin/app/coupon",
      Icon: RiCoupon3Fill,
    },
    {
      name: "Toss",
      path: "/admin/app/toss",
      Icon: FaGamepad,
    },
  ];

  return (
    <>
      {phoneActive && (
        <button
          className={`fixed top-6 left-1 sm:left-5 z-50 ${
            showModal ? "hidden" : "block"
          }`}
          onClick={() => setShowModal(true)}
        >
          <HiMenuAlt4 size={24} />
        </button>
      )}

      <aside
        className={`${
          phoneActive ? "fixed z-40" : "sticky"
        } top-0 h-screen bg-white w-72 p-5 transition-transform ${
          phoneActive && !showModal ? "-translate-x-full" : "translate-x-0"
        }`}
      >
        <h2 className="text-2xl font-bold">Logo</h2>

        {/* Close button for mobile */}
        {phoneActive && (
          <button
            className="absolute top-8 right-4"
            onClick={() => setShowModal(false)}
          >
            <FaX />
          </button>
        )}
        {/* dashboard */}
        <div className="mt-5">
          <span className="uppercase text-neutral-500/80 text-sm">
            dashboard
          </span>
          {dashboardTabs.map((tab) => (
            <Link
              key={tab.path}
              to={tab.path}
              className={`w-full px-4 py-3 flex ml-2 items-center gap-4 hover:bg-purple-50 rounded-lg ${
                location.pathname === tab.path
                  ? "bg-purple-50 text-purple-600"
                  : ""
              }`}
              onClick={() => phoneActive && setShowModal(false)}
            >
              <tab.Icon />
              <span>{tab.name}</span>
            </Link>
          ))}
        </div>
        {/* charts */}
        <div className="mt-5">
          <span className="uppercase text-neutral-500/80 text-sm">charts</span>
          {chartTabs.map((tab) => (
            <Link
              key={tab.path}
              to={tab.path}
              className={`w-full px-4 py-3 flex ml-2 items-center gap-4 hover:bg-purple-50 rounded-lg ${
                location.pathname === tab.path
                  ? "bg-purple-50 text-purple-600"
                  : ""
              }`}
              onClick={() => phoneActive && setShowModal(false)}
            >
              <tab.Icon />
              <span>{tab.name}</span>
            </Link>
          ))}
        </div>
        {/* apps */}
        <div className="mt-5">
          <span className="uppercase text-neutral-500/80 text-sm">
            dashboard
          </span>
          {appTabs.map((tab) => (
            <Link
              key={tab.path}
              to={tab.path}
              className={`w-full px-4 py-3 flex ml-2 items-center gap-4 hover:bg-purple-50 rounded-lg ${
                location.pathname === tab.path
                  ? "bg-purple-50 text-purple-600"
                  : ""
              }`}
              onClick={() => phoneActive && setShowModal(false)}
            >
              <tab.Icon />
              <span>{tab.name}</span>
            </Link>
          ))}
        </div>
      </aside>

      {/* Backdrop for mobile */}
      {phoneActive && showModal && (
        <div
          className="fixed top-0 left-0 w-screen h-screen bg-black/50 z-30"
          onClick={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default AdminSidebar;
