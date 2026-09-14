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
  const max = Math.max(tn, fp, fn, tp)


  const data = {
    datasets: [{
      data: [
        { x: '0', y: '0', v: tn },
        { x: '1', y: '0', v: fp },
        { x: '0', y: '1', v: fn },
        { x: '1', y: '1', v: tp },
      ],
      backgroundColor: (ctx) => blueScale(),
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
        font: { weight: 500, size: 16 },

      },
    },
    scales: {
      x: {
        type: 'category', labels: ['0', '1'], offset: true,
        title: { display: true, text: 'Predicted label' },
        grid: { display: false },
      },
      y: {
        type: 'category', labels: ['0', '1'], offset: true,
        title: { display: true, text: 'True label' },
        grid: { display: false },
      },
    },
  }

  return (
    <div style={{ display: 'flex', alignItems: 'stretch', gap: '12px', maxWidth: 420 }}>
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
