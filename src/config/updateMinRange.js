import { nowAsEpoch } from 'binary-utils';
import getMainSeries from '../utils/getMainSeries';

export default (chart) => {
    const mainSeries = getMainSeries(chart);

    const xAxis = chart.xAxis[0];

    const { max } = xAxis.getExtremes();

    if (mainSeries.options.data.length > 1) {
        const futureSeries = chart.get('future');
        const data1 = mainSeries.options.data[0];
        const data2 = mainSeries.options.data[1];

        const xDiff = data2[0] - data1[0];
        const oldMinRange = chart.xAxis[0].options.minRange;

        let newMinRange = xDiff * 10;

        if (futureSeries) {
            const futureX = futureSeries.options.data[0][0];

            if (futureX <= max) {
                const additionSpace = futureX - (nowAsEpoch() * 1000);
                newMinRange = (xDiff * 10) + additionSpace;
            }
        }

        if (oldMinRange !== newMinRange) {
            xAxis.update({ minRange: newMinRange }, false);
        }
    }
};
