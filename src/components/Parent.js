import { useEffect, useState } from "react";
import SampleData from "../resources/SampleData";
import Table from "./Table";
import { TabStrip, TabStripTab } from "@progress/kendo-react-layout";

function Main() {
  const [data, setData] = useState();
  const [selected, setSelected] = useState(0);
  const tabs = ["items", "categories", "itemTypes", "manufacturers"];

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function handleSelect(event) {
    setSelected(event.selected);
  }

  useEffect(() => {
    const fetchedData = fetchData();
    setData(fetchedData);
  }, []);

  const tabStrips = tabs.map((tabName) => (
    <TabStripTab title={capitalizeFirstLetter(tabName)} key={tabName}>
      <Table tableName={tabName} tableData={data} />
    </TabStripTab>
  ));

  console.log(data);
  return (
    <div className="card-component">
      <TabStrip selected={selected} onSelect={handleSelect}>
        {tabStrips}
      </TabStrip>
    </div>
  );
}

export default Main;

function fetchData() {
  return SampleData;
}
