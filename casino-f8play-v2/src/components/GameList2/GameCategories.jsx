import React, { useState } from "react";
import "./GameList.css";

const CategoryTab = ({ type, name, icon, selecedCategory, setSelecedCategory, setEzSelect }) => (
  type &&
  <div
    key={type} // You can choose any unique key, here I'm using categoryKey
    className={`single-category flex items-center gap-x-2 cursor-pointer ${selecedCategory === type ? "bg-[#1F71C9]" : ""} py-0.5 px-1`}
    style={{ maxWidth: "12em" }}
    onClick={() => {
      setEzSelect(null);
      setSelecedCategory(type);
    }}
  >
    {name ? (
      <>
        <img src={icon} alt="" style={{ maxWidth: "40px" }} />
        <p className="category-name uppercase text-xl sm:text-sm">
          {name}
        </p>
      </>
    ) : (
      <img src={icon} alt="" style={{ maxWidth: "120px" }} />
    )}
  </div>
);

function GameCategories({selecedCategory, setSelecedCategory, setEzSelect, showCategories, setShowCategories, configData }) {
  // let categories = configData && configData.categories


  return (
    <div className={`game-categories mx-auto z-10 relative flex justify-center ${configData == "th" ? "bg-[#FFFFFF]" : "bg-[#124ba0]"} `}>
      <CategoryTab
        type={configData && configData.category_tab_1_type}
        name={configData && configData.category_tab_1_name}
        icon={configData && configData.category_tab_1_icon}
        selecedCategory={selecedCategory}
        setSelecedCategory={setSelecedCategory}
        setEzSelect={setEzSelect}
      />
      <CategoryTab
        type={configData && configData.category_tab_2_type}
        name={configData && configData.category_tab_2_name}
        icon={configData && configData.category_tab_2_icon}
        selecedCategory={selecedCategory}
        setSelecedCategory={setSelecedCategory}
        setEzSelect={setEzSelect}
      />
      {/* EVO888H5 */}
      {/* <CategoryTab
        type={configData && configData.category_tab_3_type}
        name={configData && configData.category_tab_3_name}
        icon={configData && configData.category_tab_3_icon}
        selecedCategory={selecedCategory}
        setSelecedCategory={setSelecedCategory}
        setEzSelect={setEzSelect}
      /> */}
      {/* EUROCUP */}
      {/* <CategoryTab
        type={configData && configData.category_tab_4_type}
        name={configData && configData.category_tab_4_name}
        icon={configData && configData.category_tab_4_icon}
        selecedCategory={selecedCategory}
        setSelecedCategory={setSelecedCategory}
        setEzSelect={setEzSelect}
      /> */}
    </div>
    // <div
    //   id="categories"
    //   className={`shrink-0 z-10 relative max-h-full transition-all duration-500 ${
    //     showCategories ? "translate-x-0" : "translate-x-custom_C"
    //   }`}
    // >
    //   <div
    //     className={`shrink-0 categories_container-outer relative max-h-full w-96 transition-width duration-500 overflow-x-hidden overflow-y-auto`}
    //   >
    //     <ul className={`categories_container h-full w-96`}>
    //       {categories.map((category) => (
    //         <li className="category flex flex-col items-center" onClick={()=>setSelecedCategory(category.key)}>
    //           <img
    //             className="category-img w-8/12"
    //             src={category.image}
    //             alt=""
    //             style={{width: "57%"}}
    //           />
    //           <p className="category-name uppercase">{category.name}</p>
    //         </li>
    //       ))}
    //     </ul>
    //   </div>
    // </div>
  );
}

export default GameCategories;
