import React, {useEffect} from 'react';

import {LangSwitcher} from '../common/components/LangSwitcher';
import {getInitialLanguage, Language} from '../common/lang';
import {LangContext} from '../common/lang-react';
import {Bookmarklets} from './Bookmarklets';
import {OtherTools} from './OtherTools';

const UIMessages = {
  [Language.zh_TW]: {pageTitle: "mai-tools 介紹"},
  [Language.en_US]: {pageTitle: "mai-tools index"},
  [Language.ko_KR]: {pageTitle: "mai-tools 소개"},
};

export const RootComponent = () => {
  const lang = getInitialLanguage();
  const messages = UIMessages[lang];
  useEffect(() => {
    document.title = messages.pageTitle;
  }, [lang]);

  return (
    <LangContext.Provider value={lang}>
      <br />
      <LangSwitcher />
      <Bookmarklets />
      <OtherTools />
      <div className="footer">
        <hr />
        Made by{" "}
        <a className="authorLink" href="https://github.com/myjian" target="_blank">
          myjian
        </a>
        .
      </div>
    </LangContext.Provider>
  );
};
