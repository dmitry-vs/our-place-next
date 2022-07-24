import React, { FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppSelector } from '../store';
import { selectUserName } from '../../auth/auth-slice';
import { AppRoutes } from '../routes';

const Navigation: FC = () => {
  const router = useRouter();
  const userName = useAppSelector(selectUserName);

  useEffect(() => {
    const { pathname, replace } = router;

    if (pathname === AppRoutes.Auth) {
      userName && replace(AppRoutes.Index);
    } else {
      !userName && replace(AppRoutes.Auth);
    }
  }, [router, userName]);

  return null;
};

export default Navigation;
