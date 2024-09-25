import React from "react";
import Page from "../components/Page";
import {
  IconArmchair2,
  IconCarrot,
  IconChevronRight,
  IconFriends,
} from "@tabler/icons-react";
import { iconStroke } from "../config/config";
import { Link } from "react-router-dom";
import { useDashboard } from "../controllers/dashboard.controller";
import { CURRENCIES } from "../config/currencies.config";
import { useInvoices } from "../controllers/invoices.controller";

export default function DashboardPage() {
  const { data, error, isLoading } = useDashboard();

  const { data: invoices } = useInvoices({
    type: 'today',
    from: null,
    to: null,
  });

  if (isLoading) {
    return <Page>Please wait...</Page>;
  }

  if (error) {
    console.error(error);
    return <Page>Error Loading Dashboard Data, Please try later!</Page>;
  }

  const {
    reservations,
    topSellingItems,
    ordersCount,
    newCustomerCount,
    repeatedCustomerCount,
    currency: currencyCode,
  } = data;

  const currency = CURRENCIES.find((c) => c.cc == currencyCode);
  const totalAmount = invoices?.reduce((accumulator, invoice) => {
    return accumulator + parseFloat(invoice.total);
  }, 0);
  return (
    <Page>
      <h3 className="text-2xl">Dashboard</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-6">
        {/* reservation */}
        {/* <div className='border border-grey rounded-3xl h-96 overflow-y-auto'>
          <div className='py-5 px-6 bg-white/80 backdrop-blur rounded-t-3xl sticky top-0'>
            <Link to="/dashboard/reservation" className='font-bold'>Reservations</Link>
          </div>

          <div className='px-6 flex flex-col divide-y'>
            {reservations.map((reservation,i)=>{

              const { 
                id,
                customer_id,
                customer_name,
                date,
                table_id,
                table_title,
                status,
                notes,
                people_count,
                unique_code,
                created_at,
                updated_at,
              } = reservation;

              const formmatedDate = new Intl.DateTimeFormat("en", {dateStyle: "medium", timeStyle: "short"}).format(new Date(date))

              return <div className='py-2' key={i}>
                <p className="text-xs text-gray-500">{formmatedDate}</p>
                <p className='text-base mt-1'>{customer_name} <span className="text-xs text-gray-500">- ({customer_id})</span></p>
                <div className='flex items-center gap-2 mt-1'>
                  <p className="flex items-center gap-2 text-xs">
                    <IconFriends stroke={iconStroke} size={14} /> {people_count} People
                  </p>
                  <p className="flex items-center gap-2 text-xs">
                    <IconArmchair2 stroke={iconStroke} size={14} /> {table_title}
                  </p>
                </div>
              </div>;
            })}
          </div>

          <div className="h-6"></div>
        </div> */}
        {/* reservation */}

        {/* popular items */}
        <div className="border border-grey rounded-md h-96 overflow-y-auto">
          <div className="py-5 px-6 bg-white/80 backdrop-blur rounded-t-3xl sticky top-0">
            <h3 className="font-bold">Top Selling Items</h3>
          </div>

          <div className="px-6 flex flex-col">
            {/* item */}
            {topSellingItems.map((item, i) => {
              return (
                <div className="mb-4 flex items-center gap-2 w-full" key={i}>
                  <div className="bg-gray-100 text-gray-500 flex items-center justify-center w-12 h-12 rounded-lg">
                    <IconCarrot stroke={iconStroke} />
                  </div>

                  <div className="flex-1">
                    <p>{item?.title}</p>
                    <p className="text-xs text-gray-500">
                      {currency?.symbol}
                      {item?.price}
                    </p>
                  </div>

                  <p className="font-bold">{item?.orders_count}</p>
                </div>
              );
            })}
            {/* item */}
          </div>
        </div>
        {/* popular items */}

        {/* <div className="flex flex-col gap-6"> */}
        {/* items sold */}
        <div className='border border-grey rounded-3xl h-28 py-5 px-6'>
          <h3 className="font-bold">Sale Calculator</h3>
          <p className="mt-2 text-4xl">Rs: {totalAmount ? totalAmount : 0}</p>
        </div>
        {/* items sold */}

        {/* new customers */}
        {/* <div className='border border-grey rounded-3xl h-28 py-5 px-6'>
          <h3 className="font-bold">New Registered Customers</h3>
          <p className="mt-2 text-4xl">{newCustomerCount||0}</p>
        </div> */}
        {/* new customers */}

        {/* repeated customers */}
        {/* <div className='border border-grey rounded-3xl h-28 py-5 px-6'>
          <h3 className="font-bold">Repeat Customers</h3>
          <p className="mt-2 text-4xl">{repeatedCustomerCount||0}</p>
        </div> */}
        {/* repeated customers */}
      </div>

      {/* banner: view more in reports */}
      {/* <Link to="/dashboard/reports" className='block rounded-3xl py-5 px-6 hover:bg-gray-50 transition active:scale-95 border border-grey text-restro-green-dark bg-[url(/assets/circle_illustration.svg)] bg-no-repeat bg-right-bottom'>
          <p>View More Data in Reports <IconChevronRight stroke={iconStroke}/></p>
        </Link> */}
      {/* banner: view more in reports */}
      {/* </div> */}
    </Page>
  );
}
