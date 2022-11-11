import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './ui/pages/Home'

export const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
			</Routes>
		</BrowserRouter>
	);
};
