import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import styled from 'styled-components';
import { useGlobalContext } from '../context/globalContext';

const ViewTransactions = () => {
    const { incomes, expenses, getIncomes, getExpenses } = useGlobalContext();
    const [filteredCategory, setFilteredCategory] = useState('All');

    useEffect(() => {
        getIncomes();
        getExpenses();
    }, []);

    const handleCategoryChange = (e) => {
        setFilteredCategory(e.target.value);
    };

    const categories = ['All', 'Salary', 'Freelance', 'Investments', 'Groceries', 'Rent', 'Entertainment', 'Utilities'];

    const filteredIncomes = incomes.filter(item => filteredCategory === 'All' || item.category === filteredCategory);
    const filteredExpenses = expenses.filter(item => filteredCategory === 'All' || item.category === filteredCategory);

    const data = {
        labels: ['Incomes', 'Expenses'],
        datasets: [{
            data: [filteredIncomes.reduce((acc, item) => acc + item.amount, 0), filteredExpenses.reduce((acc, item) => acc + item.amount, 0)],
            backgroundColor: ['#36A2EB', '#FF6384'],
            hoverBackgroundColor: ['#36A2EB80', '#FF638480']
        }]
    };

    return (
        <ViewTransactionsStyled>
            <div className="header">
                <h1>View Transactions</h1>
                <div className="filter">
                    <label htmlFor="category">Filter by Category:</label>
                    <select id="category" value={filteredCategory} onChange={handleCategoryChange}>
                        {categories.map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="content">
                <div className="chart-container">
                    <Pie data={data} />
                </div>
                <div className="summary">
                    <h2>Summary</h2>
                    <div className="details">
                        {filteredIncomes.map((income, index) => (
                            <div key={index} className="transaction income">
                                <p>{income.category}: +${income.amount}</p>
                                <p>{new Date(income.date).toLocaleDateString()}</p>
                            </div>
                        ))}
                        {filteredExpenses.map((expense, index) => (
                            <div key={index} className="transaction expense">
                                <p>{expense.category}: -${expense.amount}</p>
                                <p>{new Date(expense.date).toLocaleDateString()}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </ViewTransactionsStyled>
    );
};

const ViewTransactionsStyled = styled.div`
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        background: #f5f5f5;
        border-radius: 10px;
        margin-bottom: 20px;
    }

    .filter {
        display: flex;
        align-items: center;
        label {
            margin-right: 10px;
            font-weight: bold;
        }
        select {
            padding: 5px;
            border-radius: 5px;
            border: 1px solid #ccc;
        }
    }

    .content {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        .chart-container {
            width: 45%;
            padding: 20px;
            background: #fff;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .summary {
            width: 45%;
            padding: 20px;
            background: #fff;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            h2 {
                margin-bottom: 20px;
                text-align: center;
                color: #333;
            }
            .details {
                .transaction {
                    display: flex;
                    justify-content: space-between;
                    padding: 10px;
                    border-bottom: 1px solid #f0f0f0;
                    &.income {
                        color: green;
                    }
                    &.expense {
                        color: red;
                    }
                }
            }
        }
    }
`;

export default ViewTransactions;
