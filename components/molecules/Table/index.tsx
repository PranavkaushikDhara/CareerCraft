import React from "react";

interface Props {
  columns: {
    header: string;
    accessor: string;
    classname?: string;
  }[];
  data: any[];
  createRow: (item: any) => React.ReactNode;
}
const Table: React.FC<Props> = (props: Props) => {
  return (
    <div className="overflow-scroll bg-gradient-to-br from-CareerCraftBackground to-CareerCraftPrimary/20 bg-CareerCraftBackground rounded-lg p-8 shadow-lg w-full h-full">
      <table className="w-full  text-CareerCraftText">
        <thead className="">
          <tr className=" text-CareerCraftPrimaryDark uppercase text-sm ">
            {props.columns.map((col, index) => {
              return (
                <th
                  className={`${col.classname} ${
                    index === 0 ? "text-left" : "text-center"
                  }`}
                  key={col.accessor}
                >
                  {col.header}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {props.data.map((item) => {
            return props.createRow(item);
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
