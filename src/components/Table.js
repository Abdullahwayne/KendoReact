import * as React from "react";
import * as ReactDOM from "react-dom";
import { Grid, GridColumn, GridToolbar } from "@progress/kendo-react-grid";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { GridPDFExport } from "@progress/kendo-react-pdf";
import { process } from "@progress/kendo-data-query";
import DetailComponent from "./detailComponent";

import { ExcelExport } from "@progress/kendo-react-excel-export";
import {
  IntlProvider,
  load,
  LocalizationProvider,
  loadMessages,
  IntlService,
} from "@progress/kendo-react-intl";

import orders from "./orders.json";
const DATE_FORMAT = "yyyy-mm-dd hh:mm:ss.SSS";
const intl = new IntlService("en");

const Table = (props) => {
  const { tableData, data, setData, tableName } = props;
  // console.log(Object.keys(tableData), "<=== tb");
  console.log(data[tableName], "<=== data");
  // console.log(tableData, "<=== tb open");
  const [dataState, setDataState] = React.useState({
    skip: 0,
    take: 20,
    sort: [
      {
        field: "orderDate",
        dir: "desc",
      },
    ],
    group: [],
  });
  const [dataResult, setDataResult] = React.useState(process(data[tableName], dataState));
  const dataStateChange = (event) => {
    setDataResult(process(orders, event.dataState));
    setDataState(event.dataState);
  };
  const expandChange = (event) => {
    const isExpanded =
      event.dataItem.expanded === undefined
        ? event.dataItem.aggregates
        : event.dataItem.expanded;
    event.dataItem.expanded = !isExpanded;
    setDataResult({
      ...dataResult,
    });
  };
  let _pdfExport;
  const exportExcel = () => {
    _export.save();
  };
  let _export;
  const exportPDF = () => {
    _pdfExport.save();
  };

  const settingupData = () => {
    const wow = tableData.map((item, i) => {
      console.log("outerloop");
      console.log(Object.keys(item).length, "<=len");
      for (let index = 0; index < Object.keys(item).length; index++) {
        const element = Object.keys(item)[index];
        if (typeof item[element] === null) {
          item[element] = "NA";
        }
        if (typeof item[element] === "object") {
          try {
            item[element] = item[element].name;
          } catch (e) {
            item[element] = "NA";
          }
        }
      }
      return item;
    });
    console.log(wow, "<=== setted up");
    setData({ ...data, [tableName]: wow });
  };

  React.useEffect(() => {
    console.log("i ran");
    settingupData();
  }, []);
  return (
    <div style={{ width: "100%" }}>
      <Grid
        style={{
          height: "80vh",
          width: "100%",
        }}
        sortable={true}
        filterable={true}
        groupable={true}
        reorderable={true}
        pageable={{
          buttonCount: 2,
          pageSizes: true,
        }}
        data={dataResult}
        {...dataState}
        onDataStateChange={dataStateChange}
      >
        {Object.keys(data[tableName][0]).map((item, index) => {
          return <GridColumn field={item} width={200} />;
        })}
        {/* <GridColumn field="customerID" width="200px" />
        <GridColumn field="orderDate" filter="date" format="{0:D}" width="300px" />
        <GridColumn field="shipName" width="280px" />
        <GridColumn field="freight" filter="numeric" width="200px" />
        <GridColumn field="shippedDate" filter="date" format="{0:D}" width="300px" />
        <GridColumn field="employeeID" filter="numeric" width="200px" />
        <GridColumn locked={true} field="orderID" filterable={false} title="ID" width="90px" /> */}
      </Grid>
    </div>
  );
};

export default Table;
