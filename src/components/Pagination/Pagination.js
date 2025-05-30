import { Pagination as AntPagination } from "antd";
import "./Pagination.css";

const Pagination = ({ currentPage, total, onPageChange }) => {
  return (
    <AntPagination
      current={currentPage}
      total={total}
      pageSize={10}
      onChange={onPageChange}
      showSizeChanger={false}
    />
  );
};

export default Pagination;
