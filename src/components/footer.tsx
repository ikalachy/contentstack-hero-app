import React from 'react';
import Skeleton from 'react-loading-skeleton';
import parse from 'html-react-parser';
import { FooterProps, NavmenuProps, Social } from "../typescript/layout";

export default function Footer({ footer }: { footer: FooterProps, navMenu: NavmenuProps }) {
  return (
    <footer>
      <div className='max-width'>
        <div className='footer-text'>
          <h1 className="Logos">Composable Hero</h1>
        </div>

        {footer.copyright ? (
          <div  {...footer.$?.copyright as {}}>
            {parse(footer.copyright)}
          </div>
        ) : (
          <div className='copyright'>
            <Skeleton width={500} />
          </div>
        )}

        <div className='powered-by' >
          {Object.keys(footer).length ? (
            footer.social.social_share?.map((social: Social, index) => (
              <a
                href={social.link.href}
                title={social.link.title}
                key={social.link.title}
              >
                <img

                  {...social.icon.$?.url as {}}
                  src={social.icon.url}
                  alt='social icon'
                />
              </a>
            ))
          ) : (
            <a>
              <Skeleton width={100} />
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
