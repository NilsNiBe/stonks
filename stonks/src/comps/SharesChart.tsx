import React from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceArea,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartResult } from "../apis/yahooV8/interfaces";

export interface SharesChartProps {
  chartResult: ChartResult;
}

export const SharesChart = (props: SharesChartProps) => {
  const values = props.chartResult.timestamp.map((x, i) => ({
    timestamp: x * 1000,
    value:
      Math.round(props.chartResult.indicators.quote[0].close[i] * 100) / 100,
  }));

  const initialState = {
    data: values,
    left: "dataMin",
    right: "dataMax",
    refAreaLeft: "",
    refAreaRight: "",
    top: "dataMax+10",
    bottom: "dataMin-10",
    animation: true,
  };

  return (
    <div
      className="highlight-bar-charts"
      style={{ userSelect: "none", width: "100%" }}
    >
      {/* <button
        type="button"
        className="btn update"
        // OnClick={this.zoomOut.bind(this)}
      >
        Zoom Out
      </button> */}

      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          width={800}
          height={400}
          data={initialState.data}
          // OnMouseDown={(e) => this.setState({ refAreaLeft: e.activeLabel })}
          // onMouseMove={(e) => this.state.refAreaLeft && this.setState({ refAreaRight: e.activeLabel })}
          // // eslint-disable-next-line react/jsx-no-bind
          // onMouseUp={this.zoom.bind(this)}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            allowDataOverflow
            dataKey="timestamp"
            domain={[initialState.left, initialState.right]}
            type="number"
            tickFormatter={x => new Date(x).toLocaleDateString()}
          />
          <YAxis
            allowDataOverflow
            domain={[initialState.bottom, initialState.top]}
            type="number"
            yAxisId="1"
          />
          <Tooltip />
          <Line
            yAxisId="1"
            type="natural"
            dataKey="value"
            stroke="#303F9F"
            animationDuration={300}
          />

          {initialState.refAreaLeft && initialState.refAreaRight ? (
            <ReferenceArea
              yAxisId="1"
              // X1={initialState.refAreaLeft}
              // x2={initialState.refAreaRight}
              strokeOpacity={0.3}
            />
          ) : null}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
