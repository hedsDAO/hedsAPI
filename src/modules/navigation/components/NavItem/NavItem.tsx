import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const NavItem = ({ item }: any) => {
  const { pathname } = useLocation();
  return (
    <div className="" key={item.href + item.name}>
      {pathname === item.href ? (
        <li className="current text-gray-600" data-hover={item.name}>
          <Link to={item.href}>{item.name}</Link>
        </li>
      ) : (
        <li className="" data-hover={item.name}>
          <Link to={item.href}>{item.name}</Link>
        </li>
      )}
    </div>
  );
};

export default NavItem;
