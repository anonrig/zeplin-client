export interface Token {
  access_token: string
  expires_in: number
  refresh_token: string
  refresh_expires_in: number
  token_type: string
}

export interface User {
  id: string
  email: string
  username: string
  emotar: string
  avatar: string
}

export interface Project {
  id: string
  name: string
  description: string
  platform: Platform
  thumbnail: string
  status: Status
  scene_url: string
  created: number
  updated: number
  number_of_members: number
  number_of_screens: number
  number_of_components: number
  number_of_text_styles: number
  number_of_colors: number
  linked_styleguide: StyleGuide
}

export enum Platform {
  base = 'base',
  web = 'web',
  ios = 'ios',
  android = 'android',
  macos = 'macos'
}

export enum Status {
  active = 'active',
  archived = 'archived'
}

export interface StyleGuide {
  id: string
  name: string
  description: string | null
  platform: Platform
  status: Status
  number_of_members: number
}

export interface Section {
  id: string
  name: string
  created: number
}

export interface Pagination {
  limit: number
  offset: number
}

export interface Member {
  user: User
  role: string
  restricted: boolean
}

export interface Image {
  width: number
  height: number
  original_url: string
}

export interface Screen {
  id: string
  name: string
  description: string
  tags: string[]
  image: Image
  created: number
  updated: number
  number_of_notes: number
  number_of_versions: number
  section: Section
}

export interface Organization {
  id: string
  name: string
  logo: string | null
  members: Member[]
}

export interface Header {
  Authorization: string
}
