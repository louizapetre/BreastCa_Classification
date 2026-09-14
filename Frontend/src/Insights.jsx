
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip,Title } from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip,Title)

const featureNames = [
  'radius1', 'texture1', 'perimeter1', 'area1', 'smoothness1',
  'compactness1', 'concavity1', 'concave_points1', 'symmetry1', 'fractal_dimension1',
  'radius2', 'texture2', 'perimeter2', 'area2', 'smoothness2',
  'compactness2', 'concavity2', 'concave_points2', 'symmetry2', 'fractal_dimension2',
  'radius3', 'texture3', 'perimeter3', 'area3', 'smoothness3',
  'compactness3', 'concavity3', 'concave_points3', 'symmetry3', 'fractal_dimension3',
]

export default function FeatureImportanceChart({ values, label }) {
  const featureMap = {}
  featureNames.forEach((name, i) => { featureMap[name] = values[i] })

  const sortedNames = Object.keys(featureMap).sort((a, b) => featureMap[b] - featureMap[a])
  const sortedValues = sortedNames.map((name) => featureMap[name])

  const data = {
    labels: sortedNames,
    datasets: [{
      label,
      data: sortedValues,
      fill:false,  
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgb(54, 162, 235)',
      borderWidth: 1,
    }],
  }

  const options = {
    indexAxis: 'y',
    plugins: { legend: { display: false },
             title:{display:true, text:label},
             datalabels:{display:false}},
    scales: {
      x: { beginAtZero: true,ticks:{font:{size:14,weight:'bold'}}},
      y:{ticks:{font:{size:14,weight:'bold'}}}  
    },
  }

  return <Bar data={data} options={options} />
}