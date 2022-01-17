export const labelsArray = [];

export const data1 = {
  label: "Temperatura rzeczywista",
  backgroundColor: "rgb(255, 99, 132)",
  borderColor: "rgb(255, 99, 132)",
  data: [],
};

export const data2 = {
  label: "Temperatura odczuwalna",
  backgroundColor: "rgb(52, 152, 219)",
  borderColor: "rgb(52, 152, 219)",
  data: [],
};

export const dataForGraph = {
  labels: labelsArray,
  datasets: [data1, data2],
};

export const config = {
  type: "line",
  data: dataForGraph,
  options: {},
};

export const myChart = new Chart(document.getElementById("myChart"), config);
