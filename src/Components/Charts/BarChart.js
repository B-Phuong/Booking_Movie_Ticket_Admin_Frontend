import { useState } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import ReactApexChart from 'react-apexcharts'
import { List } from 'react-content-loader';
import { getTop10Users } from '../../Redux/Action/ChartActions';
import { StoreContext } from '../../Redux/Store/Store';
export const BarChart = () => {
    const store = useContext(StoreContext)
    const [isLoading, setLoading] = useState(false);
    useEffect(() => {
        getTop10Users({ store })
        setLoading(false)
    }, [store.charts?.Top10Users?.top10Users])

    // console.log(">> BARCHART top10", store.charts.Top10Users?.top10Users)
    let dataFilter = store.charts.Top10Users?.top10Users
    let userName = dataFilter?.map((item) => {
        return item["user"];
    });
    let total = dataFilter?.map((item) => {
        return item["total"];
    });
    let formatCurency = total?.map((item) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item)
    })

    const state = {

        series: [{
            name: "Tổng tiền",
            data: total
        }],
        options: {
            chart: {
                type: 'bar',
                height: 350
            },
            plotOptions: {
                bar: {
                    borderRadius: 4,
                    horizontal: true,
                }
            },
            dataLabels: {
                enabled: true
            },
            xaxis: {
                categories: userName,
            }
        },
    };

    return (
        <>
            {!isLoading ? (
                <ReactApexChart options={state.options} series={state.series} type="bar" height={140} />
            ) : (
                <List speed={2}
                    backgroundColor={'#333'}
                    foregroundColor={'#999'}>
                </List>
            )}
        </>
    )
} 