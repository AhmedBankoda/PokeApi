import dynamic from 'next/dynamic';
const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

//this is the basic pokemon object that has that stats and other information for display

interface PokemonCardProps {
    name: string;
    image: string;
    weight: number;
    xp: number;
    abilities: string[];
    HP: number;
    Attack: number;
    Defense: number;
    SpAtk: number;
    SpDef: number;
    Speed: number;
}

const PokemonCard = ({
    name,
    image,
    weight,
    abilities,
    xp,
    HP,
    Attack,
    Defense,
    SpAtk,
    SpDef,
    Speed
    
}: PokemonCardProps) => {
    const chartOptions = {  //the chart for the stats data of the pokemon
        chart: {
            id: 'stats-radar-chart',
            toolbar: {
                show: false
            },
            labels: {
                show: true,
                style: {
                    colors: ["black"],
                    fontSize: "11px",
                    fontFamily: 'Arial'
                }
            }
        },
        xaxis: {
            categories: ['HP', 'Attack', 'Defense', 'Sp. Atk', 'Sp. Def', 'Speed'],
            labels: {
                show: true,
                style: {
                    colors: ["#a8a8a8"],
                    fontSize: "11px",
                    fontFamily: 'Arial'
                }
            }
        },
        yaxis: {
            show: false,
            max: 255
        },
        plotOptions: {
            radar: {
                size: 140,
                polygons: {
                    strokeColors: '#e9e9e9',
                    fill: {
                        colors: ['#f8f8f8', '#fff']
                    }
                }
            }
        },
        markers: {
            size: 4,
            colors: ['#fff'],
            strokeColor: 'black',
            strokeWidth: 1,
        },
        
        fill: {
            opacity: 1
        },
        stroke: {
            width: 2
        },
        colors: ['black']
    };
    const series = [  //importing of the data unto the chart
        {
            name: 'Stats',
            data: [HP,Attack,Defense,SpAtk,SpDef,Speed]
        }
    ];

    return ( //simple display of the data all together
        <div className="pokemon-card-large">
            <h2>{name}</h2>
            <img src={image} alt={name} width="150px" />
            <div className="card-section">
                <p className="card-section-title">XP</p>
                <div className="card-section-content">{xp}</div>
            </div>
            <div className="card-section">
                <p className="card-section-title">Weight</p>
                <div className="card-section-content">{weight / 10} kg</div>
            </div>
            <div className="card-section">
                <p className="card-section-title">Abilities</p>
                <ul>
                    {abilities.map((ability) => (
                        <li key={ability}>{ability}</li>
                    ))}
                </ul>
            </div>
            <div className="chart-container">
                <div className="chart">
                    <ApexChart
                    options={chartOptions}
                    series={series}
                    type="radar"
                    height={350}
                    />
                </div>
                
            </div> 
            
        </div>
    );
};

export default PokemonCard;
