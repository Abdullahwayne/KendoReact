import { useEffect, useState } from "react";
import SampleData from "../resources/SampleData.json";
import Table from "./Table";
import { TabStrip, TabStripTab } from "@progress/kendo-react-layout";

function Main() {
  const importedData = SampleData;
  const [data, setData] = useState(importedData);
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

  const tabStrips = Object.keys(data).map((item, index) => (
    <TabStripTab title={capitalizeFirstLetter(item)} key={item}>
      <Table tableName={item} tableData={data[item]} data={data} setData={setData} />
    </TabStripTab>
  ));
  return (
    <div
      onClick={() => {
        console.log(data, "<-- data changed");
      }}
      className="card-component"
      style={{ width: "100%" }}
    >
      <TabStrip style={{ width: "100%" }} selected={selected} onSelect={handleSelect}>
        {tabStrips}
      </TabStrip>
    </div>
  );
}

export default Main;

function fetchData() {
  return SampleData;
}
