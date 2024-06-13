import {
  ArchiveTray,
  Chat,
  Gear,
  List as PhosphorList,
  MagnifyingGlass,
  ShoppingCart,
  SignIn,
  SquaresFour,
  Users,
} from 'phosphor-react'
import { Avatar, Button, Divider, Icon, Input, Sidebar } from 'keep-react'
import React, { useState, useEffect } from "react";
import logo from '../resources/logoClientSync.webp'

const EXCLUDED_COLLECTIONS = [
    "cache",
    "cache_locks",
    "categories",
    "failed_jobs",
    "job_batches",
    "jobs",
    "logs",
    "migrations",
    "password_reset_tokens",
    "personal_access_tokens",
    "sessions",
    "settings"
];

export default function SidebarComponent({ onCollectionSelect }) {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/collections/all");
        const data = await response.json();
        const filteredCollections = data.filter(collection => !EXCLUDED_COLLECTIONS.includes(collection));
        setCollections(filteredCollections);
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    };

    fetchCollections();
  }, []);

  return (
    <Sidebar className='sidebar'>
      <Sidebar.Header className="space-y-2.5">
        <div className="flex items-center justify-between">
          <img id='mainLogo' src={logo} />
        </div>
        <div>
          <fieldset className="relative max-w-md">
            <Input placeholder="Search here" className="ps-11" />
            <Icon>
              <MagnifyingGlass size={18} color="#00111b" />
            </Icon>
          </fieldset>
        </div>
      </Sidebar.Header>
      <Sidebar.Body>
        {collections.map(collection => (
          <Sidebar.Item className='sideBarItem' key={collection} onClick={() => onCollectionSelect(collection)}>
            <ArchiveTray size={32} />
            {collection}
          </Sidebar.Item>
        ))}
      </Sidebar.Body>
      <Divider className="my-3" />
    </Sidebar>
  )
}
