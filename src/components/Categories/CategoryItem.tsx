import React from "react";
import { Category } from "../../util/gameTypes";

import styles from "./Category.module.scss";
import classNames from "classnames";

type CategoryItemProps = {
  category: Category;
  selectCategory: (value: Category) => void;
  selected: boolean;
};

const CategoryItem: React.FC<CategoryItemProps> = ({
  category,
  selectCategory,
  selected,
}) => {
  return (
    <div
      className={classNames({
        [styles.item]: true,
        [styles._selected]: selected,
      })}
      onClick={() => selectCategory(category)}
    >
      <span className={styles.emoji}>{category.emoji}</span>
      <span>{category.displayText}</span>
    </div>
  );
};
export default CategoryItem;
