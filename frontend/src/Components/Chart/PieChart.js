import React from 'react';
import { Pie } from 'react-chartjs-2';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';

const validCategories = ['Salary', 'Groceries', 'Utilities', 'Entertainment', 'Transport', 'Health', 'Others'];

function PieChart() {
    const { incomes, expenses } = useGlobalContext();

    const pieData = {
        labels: validCategories,
        datasets: [
            {
                label: 'Transactions',
                data: validCategories.map(cat => {
                    const incomeTotal = incomes.filter(inc => inc.category === cat).reduce((sum, inc) => sum + inc.amount, 0);
                    const expenseTotal = expenses.filter(exp => exp.category === cat).reduce((sum, exp) => sum + exp.amount, 0);
                    return incomeTotal - expenseTotal; // Net amount for each category
                }),
                backgroundColor: [
                    '#FF6384', // Salary
                    '#36A2EB', // Groceries
                    '#FFCE56', // Utilities
                    '#FF6384', // Entertainment
                    '#36A2EB', // Transport
                    '#FFCE56', // Health
                    '#FF6384', // Others
                ],
            }
        ]
    };

    return (
        <PieChartStyled>
            <Pie data={pieData} />
        </PieChartStyled>
    );
}

const PieChartStyled = styled.div`
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 1rem;
    border-radius: 20px;
    height: 100%;
`;

export default PieChart;
