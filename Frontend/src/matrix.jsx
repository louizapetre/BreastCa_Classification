import { Chart as ChartJS, CategoryScale } from 'chart.js'
import { MatrixController, MatrixElement } from 'chartjs-chart-matrix'
import { Chart } from 'react-chartjs-2'
import ChartDataLabels from 'chartjs-plugin-datalabels'

ChartJS.register(MatrixController, MatrixElement, CategoryScale, ChartDataLabels)

function blueScale(t) {
  const light = [255, 255, 255]
  const dark = [8, 48, 107]
  const mix = light.map((c, i) => Math.round(c + (dark[i] - c) * t))
  return `rgb(${mix.join(',')})`
}

export default function ConfusionMatrix({ matrix }) {
  if (!matrix) return null
  const [[tn, fp], [fn, tp]] = matrix
  const cellValues = [tn, fp, fn, tp]
  const max = Math.max(...cellValues)
  const norm = (v) => v / max

  const data = {
    datasets: [{
      data: [
        { x: '0', y: '0' },
        { x: '1', y: '0' },
        { x: '0', y: '1' },
        { x: '1', y: '1' },
      ],
      backgroundColor: (ctx) => blueScale(norm(cellValues[ctx.dataIndex])),
      borderWidth: 1,
      borderColor: '#fff',
      width: ({ chart }) => (chart.chartArea || {}).width / 2 - 1,
      height: ({ chart }) => (chart.chartArea || {}).height / 2 - 1,
    }],
  }

  const options = {
    plugins: {
      legend: { display: false },
      datalabels: {
        color: (ctx) => (norm(cellValues[ctx.dataIndex]) > 0.5 ? '#fff' : '#08306b'),
        font: { weight: 500, size: 16 },
        formatter: (_, ctx) => cellValues[ctx.dataIndex],
      },
    },
    scales: {
      x: {
        type: 'category', labels: ['0', '1'], offset: true,
        title: { display: true, text: 'Predicted label' },
        grid: { display: false },
      },
      y: {
        type: 'category', labels: ['1', '0'], offset: true,
        title: { display: true, text: 'True label' },
        grid: { display: false },
      },
    },
  }

  return (
    <div style={{ display: 'flex', alignItems: 'stretch', gap: '12px', maxWidth: 480, margin:"20px auto 40px" }}>
      <div style={{ flex: 1 }}>
        <Chart type="matrix" data={data} options={options} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 28 }}>
        <div style={{
          flex: 1, width: 16, borderRadius: '2px',
          background: `linear-gradient(to top, ${blueScale(0)}, ${blueScale(1)})`,
          border: '1px solid #ccc',
        }} />
        <div style={{ fontSize: '11px', marginTop: '4px' }}>{max}</div>
      </div>
    </div>
  )
}
