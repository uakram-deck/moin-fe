import React, { useRef, useState } from "react";
import Page from "../components/Page";
import { IconFilter } from "@tabler/icons-react";
import { iconStroke } from "../config/config";
import { useReports } from "../controllers/reports.controller"
import { CURRENCIES } from "../config/currencies.config";

export default function ReportsPage() {
  const filters = [
    { key: "today", value: "Today" },
    { key: "yesterday", value: "Yesterday" },
    { key: "last_7days", value: "Last 7 Days" },
    { key: "this_month", value: "This Month" },
    { key: "last_month", value: "Last Month" },
    { key: "custom", value: "Custom Date Range" },
  ];

  const fromDateRef = useRef();
  const toDateRef = useRef();
  const filterTypeRef = useRef();

  const now = new Date();
  const defaultDateFrom = `${now.getFullYear()}-${(now.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${now.getDate().toString().padStart(2, "0")}`;
  const defaultDateTo = `${now.getFullYear()}-${(now.getMonth() + 2)
    .toString()
    .padStart(2, "0")}-${now.getDate().toString().padStart(2, "0")}`;

  const [state, setState] = useState({
    filter: filters[0].key,
    fromDate: null,
    toDate: null,
  });

  const {APIURL, data, error, isLoading} = useReports({
    type: state.filter,
    from: state.fromDate,
    to: state.toDate,
  });

  if(isLoading) {
    return <Page>
      Please wait...
    </Page>
  }

  if(error) {
    console.error(error);
    return <Page>
      Error Loading Reports Data, Please try later!
    </Page>;
  }

  const {
    ordersCount, newCustomers, repeatedCustomers, currency:currencyCode, averageOrderValue, totalCustomers, netRevenue, taxTotal, revenueTotal
  } = data;

  const currency = CURRENCIES.find((c)=>c.cc==currencyCode)?.symbol;

  return (
    <Page>
      <div className="flex items-center justify-between">
        <h3 className="text-2xl">Reports</h3>

        <button
          onClick={() => document.getElementById("filter-dialog").showModal()}
          className="btn btn-sm rounded-full"
        >
          <IconFilter stroke={iconStroke} /> Filters
        </button>
      </div>

      <h3 className="mt-6 mb-4 text-base">Showing Data for {filters.find(f=>f.key==state.filter).value}</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {/* items sold */}
        <div className="border border-grey rounded-3xl h-28 py-5 px-6">
          <h3 className="font-bold">Orders</h3>
          <p className="mt-2 text-4xl">{ordersCount || 0}</p>
        </div>
        {/* items sold */}

        {/* avg. order value */}
        <div className="border border-grey rounded-3xl h-28 py-5 px-6">
          <h3 className="font-bold">Avg. Order Value</h3>
          <p className="mt-2 text-4xl">{currency}{Number(averageOrderValue).toFixed(2) || 0}</p>
        </div>
        {/* avg. order value */}

        {/* total customers */}
        <div className="border border-grey rounded-3xl h-28 py-5 px-6">
          <h3 className="font-bold">Total Customers</h3>
          <p className="mt-2 text-4xl">{totalCustomers}</p>
        </div>
        {/* total customers */}

        {/* New customers */}
        <div className="border border-grey rounded-3xl h-28 py-5 px-6">
          <h3 className="font-bold">New Customers</h3>
          <p className="mt-2 text-4xl">{newCustomers}</p>
        </div>
        {/* New customers */}

        {/* repeat customers */}
        <div className="border border-grey rounded-3xl h-28 py-5 px-6">
          <h3 className="font-bold">Repeat Customers</h3>
          <p className="mt-2 text-4xl">{repeatedCustomers}</p>
        </div>
        {/* repeat customers */}

        {/* revenue */}
        <div className="border border-grey rounded-3xl h-28 py-5 px-6">
          <h3 className="font-bold">Revenue</h3>
          <p className="mt-2 text-4xl">{currency}{revenueTotal}</p>
        </div>
        {/* revenue */}

        {/* net sales */}
        <div className="border border-grey rounded-3xl h-28 py-5 px-6">
          <h3 className="font-bold">Net Sales</h3>
          <p className="mt-2 text-4xl">{currency}{netRevenue}</p>
        </div>
        {/* net sales */}

        {/* tax */}
        <div className="border border-grey rounded-3xl h-28 py-5 px-6">
          <h3 className="font-bold">Tax</h3>
          <p className="mt-2 text-4xl">{currency}{taxTotal}</p>
        </div>
        {/* tax */}
      </div>

      {/* filter dialog */}
      <dialog id="filter-dialog" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg flex items-center">
            <IconFilter stroke={iconStroke} /> Filter
          </h3>
          {/* filters */}
          <div className="my-4">
            <div>
              <label className=" block text-gray-500 text-sm">Filter</label>
              <select
                className="select select-sm select-bordered w-full"
                ref={filterTypeRef}
              >
                {filters.map((filter, index) => (
                  <option key={index} value={filter.key}>
                    {filter.value}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-2 mt-4">
              <div className="flex-1">
                <label
                  htmlFor="fromDate"
                  className=" block text-gray-500 text-sm"
                >
                  From
                </label>
                <input
                  defaultValue={defaultDateFrom}
                  type="date"
                  ref={fromDateRef}
                  className="text-sm w-full border rounded-lg px-4 py-1 bg-gray-50 outline-restro-border-green-light"
                />
              </div>
              <div className="flex-1">
                <label
                  htmlFor="toDate"
                  className=" block text-gray-500 text-sm"
                >
                  To
                </label>
                <input
                  defaultValue={defaultDateTo}
                  type="date"
                  ref={toDateRef}
                  className="text-sm w-full border rounded-lg px-4 py-1 bg-gray-50 outline-restro-border-green-light"
                />
              </div>
            </div>
          </div>
          {/* filters */}
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
              <button
                onClick={() => {
                  setState({
                    ...state,
                    filter: filterTypeRef.current.value,
                    fromDate: fromDateRef.current.value || null,
                    toDate: toDateRef.current.value || null,
                  });
                }}
                className="btn ml-2"
              >
                Apply
              </button>
            </form>
          </div>
        </div>
      </dialog>
      {/* filter dialog */}
    </Page>
  );
}
