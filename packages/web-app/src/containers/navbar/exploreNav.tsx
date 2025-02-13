import React from 'react';
import styled from 'styled-components';
import {ButtonWallet} from '@aragon/ui-components';
import {useTranslation} from 'react-i18next';

import {useWallet} from 'hooks/useWallet';
import Logo from 'public/proximity-logo.png';
import {useGlobalModalContext} from 'context/globalModals';
import {Container, GridLayout} from 'components/layout';
import {useNewWallet} from 'hooks/useNewWallet';
import { IoSettings } from 'react-icons/io5';

const ExploreNav: React.FC = () => {
  const {t} = useTranslation();
  // const {address, ensName, ensAvatarUrl, isConnected, methods} = useWallet();
  const {account} = useNewWallet();
  const {open} = useGlobalModalContext();

  // const handleWalletButtonClick = () => {
  //   if (isConnected) {
  //     open('wallet');
  //     return;
  //   }
  //   methods.selectWallet().catch((err: Error) => {
  //     // To be implemented: maybe add an error message when
  //     // the error is different from closing the window
  //     console.error(err);
  //   });
  // };

  return (
    <Container data-testid="navbar">
      <Menu>
        <GridLayout>
          <LeftContent>
            <LogoContainer
              src={Logo}
              onClick={() => window.open('/', '_blank')}
            />
          </LeftContent>
          <RightContent>
            <ActionsWrapper>
              <ButtonWallet
                src={null}
                onClick={async () =>
                  await window.ethereum.request({method: 'eth_requestAccounts'})
                }
                isConnected={Boolean(account)}
                label={account ? account : 'Connect Wallet'}
              />
            </ActionsWrapper>
            <button onClick={undefined}>
            <IoSettings />
            </button>
          </RightContent>
        </GridLayout>
      </Menu>
    </Container>
  );
};

const Menu = styled.nav.attrs({
  className: 'py-2 desktop:py-3',
})`
  background: linear-gradient(180deg, #3164fa 0%, rgba(49, 100, 250, 0) 100%);
`;

const LeftContent = styled.div.attrs({
  className: 'col-span-3 tablet:col-span-2 flex items-center',
})``;

const LogoContainer = styled.img.attrs({
  className: 'h-10 w-20 h-4 cursor-pointer',
})``;

const RightContent = styled.div.attrs({
  className:
    'col-start-9 col-span-4 flex flex-row-reverse justify-between items-center',
})``;

const ActionsWrapper = styled.div.attrs({
  className: 'flex space-x-3 items-center',
})``;

export default ExploreNav;
