export const loading = (array, { status }) => {
  array.forEach((item) => {
    const [className, animationName] = item;
    const className_element = document.querySelector(`.${className}`);
    if (status) {
      className_element?.classList.add(animationName);
      return void 0;
    }
    className_element?.classList.remove(animationName);
  });
};
