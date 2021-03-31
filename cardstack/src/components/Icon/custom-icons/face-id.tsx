import * as React from 'react';
import Svg, { SvgProps, G, Path } from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      xmlns="http://www.w3.org/2000/svg"
      width={20.3}
      height={20.299}
      viewBox="0 0 20.3 20.299"
      {...props}
    >
      <G data-name="icon_Face ID" stroke="#000" strokeWidth={0.3}>
        <Path
          data-name="Path 8650"
          d="M.93 7.737a.792.792 0 00.78-.78V3.311a1.6 1.6 0 011.6-1.6h3.626a.78.78 0 100-1.559H3.311A3.157 3.157 0 00.15 3.311v3.625a.8.8 0 00.78.801z"
        />
        <Path
          data-name="Path 8651"
          d="M19.391 12.584a.792.792 0 00-.78.78v3.62a1.6 1.6 0 01-1.6 1.6h-3.647a.78.78 0 100 1.559h3.62a3.157 3.157 0 003.165-3.159v-3.62a.76.76 0 00-.758-.78z"
        />
        <Path
          data-name="Path 8652"
          d="M17.009.15h-3.645a.78.78 0 100 1.559h3.62a1.6 1.6 0 011.6 1.6v3.627a.78.78 0 101.559 0V3.311A3.126 3.126 0 0017.009.15z"
        />
        <Path
          data-name="Path 8653"
          d="M6.957 18.611H3.311a1.6 1.6 0 01-1.6-1.6v-3.647a.78.78 0 10-1.559 0v3.62a3.157 3.157 0 003.161 3.161h3.623a.792.792 0 00.78-.78.755.755 0 00-.759-.754z"
        />
        <Path
          data-name="Path 8654"
          d="M13.006 13.277a.77.77 0 00-1.1-.021 2.76 2.76 0 01-1.728.485 2.712 2.712 0 01-1.728-.485.776.776 0 00-1.073 1.121 4.139 4.139 0 002.8.906 4.139 4.139 0 002.8-.906.789.789 0 00.029-1.1z"
        />
        <Path
          data-name="Path 8655"
          d="M5.081 6.136v1.22a.78.78 0 101.559 0v-1.22a.792.792 0 00-.78-.78.778.778 0 00-.779.78z"
        />
        <Path
          data-name="Path 8656"
          d="M15.238 7.356v-1.22a.78.78 0 10-1.559 0v1.22a.78.78 0 101.559 0z"
        />
        <Path
          data-name="Path 8657"
          d="M9.654 11.489a.583.583 0 00.19-.021l1.012-.253a.79.79 0 00.59-.759V7.822a.78.78 0 10-1.559 0v2.02l-.421.105a.779.779 0 00-.569.948.8.8 0 00.757.594z"
        />
      </G>
    </Svg>
  );
}

export default SvgComponent;