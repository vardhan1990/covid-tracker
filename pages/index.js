import { useState, useEffect } from "react";
import styled from "styled-components";

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1rem;
    padding: 1rem 1rem 1rem 1rem;
    font-size: 2rem;
    height: 10rem;
    marign: 1rem 1rem 1rem 1rem;
`;

const Card = styled.div`
    padding: 1rem 1rem 1rem 1rem;
    background: #03c5c5;
    border-radius: 1.5rem;
    text-align: center;
    width: 20rem;
    height: 10rem;
`;

function useStats(countryCode) {
    const [stats, setStats] = useState();
    let url = 'https://covid19.mathdro.id/api';
    if(countryCode) {
        url+="/countries/";
        url+=countryCode;
    }
    useEffect(() => {
        async function fetchData() {
            const data = await fetch(url).then(res => res.json());
            setStats(data);
        };
        fetchData();
    }, []);
    return stats;
}

function Stat ({ title, number }) {
    return <Card><h3>{title}</h3><h4>{number}</h4></Card>;
}

function Stats({ countryCode }) {
    console.log(countryCode);
    const stats = useStats(countryCode);
    if(!stats) {
        return <div>...</div>
    }

    return <Grid>
                <Stat title="Deaths" number={stats.deaths.value} />
                <Stat title="Confirmed" number={stats.confirmed.value} />
                <Stat title="Recovered" number={stats.recovered.value} />
        </Grid>;
}

export default function IndexPage() {
    return <div>
        <h1>Global</h1>
        <Stats></Stats>
        <h1>USA</h1>
        <Stats countryCode="USA"></Stats>
        <h1>IND</h1>
        <Stats countryCode="IND"></Stats>
    </div>;
}