import { useContext, useEffect } from 'react';
import classes from './styles.module.css'; //(css is imported as the classes object)
import { GlobalContext } from '../../context';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Header() {
	return <h1>hello</h1>;
}
