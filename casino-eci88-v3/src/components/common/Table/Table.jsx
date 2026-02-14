import React, { useState } from "react";
import { Page, Pagination, TableBody, TableCell, TableContainer, TableRow, TableWithPagination } from "./Table.styled";
import NoData from "../NoData";
import { useTranslation } from "react-i18next";

function Table({ sx, header, columns, data, showAll }) {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const {table_bg, text_align, responsive_text, fontSize, padding} = sx
  return (
    <TableWithPagination>
      <TableContainer
        $table_bg={table_bg}
        $text_align={text_align}
        $responsive_text={responsive_text}
        $fontSize={fontSize}
      >
        <thead>
          {
            header?
            <TableRow>
              <TableCell
                $fontSize={header?.fontSize}
                $uppercase={header?.uppercase}
                $background={header?.background}
                $color={header?.color}
                $bold={header?.$bold}
                colSpan={header?.span ? header.span : 1}
              >
                {header.label}
              </TableCell>
            </TableRow>
            :null
          }

          <TableRow>
            {Object.keys(columns ? columns : {})?.map((column) => {
              return (
              <TableCell
                key={column}
                $responsiveFont={sx?.responsiveFont}
                $columnBorder={sx?.columnBorder}
                $fontSize={columns[column]?.fontSize}
                $uppercase={columns[column]?.uppercase}
                $background={columns[column]?.background}
                $color={columns[column]?.color}
                $bold={columns[column]?.$bold}
                colSpan={columns[column].span ? columns[column].span : 1}
                padding={padding}
              >
                {t(columns[column].label)}
              </TableCell>
            )})}
          </TableRow>
        </thead>
        <TableBody $color={sx.$color}>
          {data?.length?data
            ?.filter((row, i) => showAll || i < page * 10 && i >= page * 10 - 10)
            ?.map((row, i) => (
              <TableRow key={Date.now() + i}>
                {Object.keys(row ? row : {})?.map((column) => {
                  return (
                    <TableCell
                      key={column}
                      $columnBorder={sx?.columnBorder}
                      $fontSize={row[column]?.fontSize}
                      $uppercase={row[column]?.uppercase}
                      $background={row[column]?.background}
                      $color={row[column]?.color}
                      $bold={row[column]?.$bold}
                      colSpan={row[column].span ? row[column].span : 1}
                      padding={padding}
                    >
                      {row[column].value}
                    </TableCell>
                  );
                })}
              </TableRow>
            )):null}
        </TableBody>
      </TableContainer>
      {
        !data?.length?
        <NoData icon="mdi:database-off" />
        :null
      }
      {
        !showAll && data?.length>10?
        <Pagination>
          <Page onClick={() => page > 1 && setPage(page - 1)}>{t("Prev")}</Page>
          {Array.from({ length: Math.ceil(data?.length / 10) }).map((_, index) => {
            const pageNum = index + 1;
            const totalPages = Math.ceil(data?.length / 10);
            const delta = 2; // Number of pages to show before and after the current page

            // Determine if the page number should be visible
            const isVisible =
              pageNum === 1 ||
              pageNum === totalPages ||
              (pageNum >= page - delta && pageNum <= page + delta);

            if (isVisible) {
              return (
                <Page key={pageNum} $active={page === pageNum} onClick={() => setPage(pageNum)}>
                  {pageNum}
                </Page>
              );
            } else if (
              pageNum === page - delta - 1 ||
              pageNum === page + delta + 1
            ) {
              // Display ellipsis at the appropriate place
              return (
                <span className="page-dots">...</span>
              );
            }

            // Don't render anything for pages outside the range
            return null;
          })}
          <Page
            onClick={() =>
              page < Math.ceil(data?.length / 10) && setPage(page + 1)
            }
          >
            {t("Next")}
          </Page>
        </Pagination>
        :null
      }
    </TableWithPagination>
  );
}

export default React.memo(Table);
