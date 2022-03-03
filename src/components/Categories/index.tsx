import React, { useContext } from "react";
import { CATEGORIES } from "../../util/staticData";
import CategoryItem from "./CategoryItem";
import { GameContext } from "../../context/GameProvider";

import styles from "./Category.module.scss";
import { GameState } from "../../util/gameTypes";

type CategoriesProps = {};

const Categories: React.FC<CategoriesProps> = ({}) => {
  const { gameState, selectCategory } = useContext(GameContext);

  return (
    <div className="component_wrapper">
      <span className="primary_text xl_text">Choose a Category</span>
      <div className={styles.categories_container}>
        {CATEGORIES.map((category) => (
          <CategoryItem
            category={category}
            selectCategory={selectCategory}
            selected={category.categoryId === gameState.category.categoryId}
          />
        ))}
      </div>
      <button className="btn_primary submit_btn">Submit</button>
    </div>
  );
};
export default Categories;
