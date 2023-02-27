import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);

	return (
		<ul className='mainNav'>
			<li>
				<div className='navLogo'>
					Chesshero.org
				</div>
			</li>
			<li>
				<NavLink exact to='/' activeClassName='active' activeStyle={{ color: 'yellow' }} style={{ color: 'white', textDecoration: 'none' }}>
					Play
				</NavLink>
			</li>
			<li>
				<NavLink exact to='/forum' activeClassName='active' activeStyle={{ color: 'yellow' }} style={{ color: 'white', textDecoration: 'none' }}>
					Forum
				</NavLink>
			</li>
			{isLoaded && (
				<li className='userButtonNav'>
					<ProfileButton user={sessionUser} />
				</li>
			)}
		</ul>
	);
}

export default Navigation;
