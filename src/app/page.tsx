import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import BasicChartPage from "./chart/page";

export const metadata: Metadata = {
  title: "Dashboard Customer",
  description: "Dashboard Customer",
};

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <BasicChartPage />
      </DefaultLayout>
    </>
  );
}
