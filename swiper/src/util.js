const $ = (target) => {
  return document.querySelector(target)
}

$.creatE = (type) => {
  return document.createElement(type);
}

export default $
