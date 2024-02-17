import React from "react";
import { AutoLinkPlugin } from "@lexical/react/LexicalAutoLinkPlugin";

const URL_MATCHER =
  /((https?:\/\/(www\.)?)|(www\.))[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

const EMAIL_MATCHER =
  /(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;

const HASH_TAG = /#\w+/;

const ANY_MATCH = /\w+/;
const MATCHERS = [
  (text) => {
    const match = URL_MATCHER.exec(text);
    return (
      match && {
        index: match.index,
        length: match[0].length,
        text: match[0],
        url: match[0],
      }
    );
  },
  (text) => {
    const match = EMAIL_MATCHER.exec(text);
    return (
      match && {
        index: match.index,
        length: match[0].length,
        text: match[0],
        url: `mailto:${match[0]}`,
      }
    );
  },
  (text) => {
    const match = HASH_TAG.exec(text);
    console.log(match,"===here===")
    return (
      match && {
        index: match.index,
        length: match[0].length,
        text: match[0],
        attributes: { rel: "noreferrer", target: "hashtag" },
      }
    );
  },
];

const MATCHERSLINKS = [
  (text) => {
    const match = ANY_MATCH.exec(text);
    const obj = {
      text,
      index: 0,
      input: text,
      groups: undefined
    }


    return ( match && {
      index: match.index,
        length: match[0].length,
        text: match[0],
        url: match[0],
    });
  },
];

export default function PlaygroundAutoLinkPlugin({ onlyLinks }) {
  if (onlyLinks) {
    return <AutoLinkPlugin matchers={MATCHERSLINKS} />;
  }
  return <AutoLinkPlugin matchers={MATCHERS} />;
}
