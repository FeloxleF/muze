--
-- PostgreSQL database dump
--

-- Dumped from database version 16.4 (Debian 16.4-1.pgdg120+1)
-- Dumped by pg_dump version 16.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: playlists; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.playlists (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description character varying(255),
    user_id integer,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.playlists OWNER TO postgres;

--
-- Name: playlist_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.playlists ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.playlist_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: playlist_songs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.playlist_songs (
    id integer NOT NULL,
    id_song integer,
    id_playlist integer,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.playlist_songs OWNER TO postgres;

--
-- Name: playlist_song_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.playlist_songs ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.playlist_song_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: songs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.songs (
    id integer NOT NULL,
    name character varying(255),
    artist character varying(255),
    style character varying(255),
    duration time without time zone,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.songs OWNER TO postgres;

--
-- Name: song_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.songs ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.song_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(255),
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: playlist_songs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.playlist_songs (id, id_song, id_playlist, created_at, updated_at) FROM stdin;
100	15	27	2024-10-09 08:40:26.714	2024-10-09 08:40:26.714
101	7	27	2024-10-09 08:40:26.714	2024-10-09 08:40:26.714
102	12	27	2024-10-09 08:40:26.714	2024-10-09 08:40:26.714
5	3	3	2024-10-01 12:47:00.206	2024-10-01 12:47:00.206
15	15	3	2024-10-07 07:45:47.746463	2024-10-07 07:45:47.746463
17	12	3	2024-10-07 07:47:15.85546	2024-10-07 07:47:15.85546
18	4	5	2024-10-07 07:47:43.025625	2024-10-07 07:47:43.025625
19	21	5	2024-10-07 07:47:55.566501	2024-10-07 07:47:55.566501
20	13	2	2024-10-07 07:50:04.511496	2024-10-07 07:50:04.511496
21	27	2	2024-10-07 07:50:16.263118	2024-10-07 07:50:16.263118
23	16	2	2024-10-07 07:50:33.415179	2024-10-07 07:50:33.415179
33	20	16	2024-10-08 12:55:33.719	2024-10-08 12:55:33.719
35	11	16	2024-10-08 12:55:33.719	2024-10-08 12:55:33.719
36	5	16	2024-10-08 12:55:33.719	2024-10-08 12:55:33.719
37	29	16	2024-10-08 12:55:33.719	2024-10-08 12:55:33.719
38	7	16	2024-10-08 12:55:33.719	2024-10-08 12:55:33.719
39	7	17	2024-10-08 12:59:16.557	2024-10-08 12:59:16.557
40	30	17	2024-10-08 12:59:16.557	2024-10-08 12:59:16.557
41	24	17	2024-10-08 12:59:16.557	2024-10-08 12:59:16.557
42	14	17	2024-10-08 12:59:16.557	2024-10-08 12:59:16.557
43	16	17	2024-10-08 12:59:16.557	2024-10-08 12:59:16.557
44	21	17	2024-10-08 12:59:16.557	2024-10-08 12:59:16.557
46	30	18	2024-10-08 13:04:33.247	2024-10-08 13:04:33.247
47	8	18	2024-10-08 13:04:33.247	2024-10-08 13:04:33.247
48	2	18	2024-10-08 13:04:33.247	2024-10-08 13:04:33.247
49	26	18	2024-10-08 13:04:33.247	2024-10-08 13:04:33.247
50	11	18	2024-10-08 13:04:33.247	2024-10-08 13:04:33.247
51	27	18	2024-10-08 13:04:33.247	2024-10-08 13:04:33.247
73	18	22	2024-10-08 13:21:26.856	2024-10-08 13:21:26.856
74	4	22	2024-10-08 13:21:26.856	2024-10-08 13:21:26.856
81	13	24	2024-10-08 13:42:09.033	2024-10-08 13:42:09.033
82	17	24	2024-10-08 13:42:09.033	2024-10-08 13:42:09.033
85	27	24	2024-10-08 13:42:09.033	2024-10-08 13:42:09.033
\.


--
-- Data for Name: playlists; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.playlists (id, name, description, user_id, created_at, updated_at) FROM stdin;
3	playlist test	description test	1	2024-10-01 12:47:00.202	2024-10-01 12:47:00.202
5	play	test	10	2024-10-04 10:39:16.813233	2024-10-04 10:39:16.813233
2	Playlist waz	description test	1	2024-10-01 12:45:47.077	2024-10-01 12:45:47.077
16	Playyy	\N	10	2024-10-08 12:55:33.716	2024-10-08 12:55:33.716
17	eee	\N	10	2024-10-08 12:59:16.553	2024-10-08 12:59:16.553
18	eeeeee	\N	10	2024-10-08 13:04:33.244	2024-10-08 13:04:33.244
22	test	\N	1	2024-10-08 13:21:26.852	2024-10-08 13:21:26.852
24	geth	\N	1	2024-10-08 13:42:09.03	2024-10-08 13:42:09.03
27	testos	\N	13	2024-10-09 08:40:26.709	2024-10-09 08:40:26.709
\.


--
-- Data for Name: songs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.songs (id, name, artist, style, duration, created_at) FROM stdin;
2	Liquide Sunshine	Biga Ranx	Reggea	03:13:00	2024-09-26 08:47:13.683186
3	My Face	Biga Ranx	Reggea	00:03:53	2024-09-26 08:48:40.873419
4	French Wine	Biga Ranx	Reggea	00:03:52	2024-09-26 08:49:14.168537
5	Rendez-vous	Biga Ranx	Reggea	00:03:17	2024-09-26 08:49:36.8659
6	Bombtrack	Rage Against The Machine	Alternatif	00:04:05	2024-09-26 08:51:25.987858
7	People of the sun	Rage Against The Machine	Alternatif	00:02:30	2024-09-26 08:51:54.114321
8	Testify	Rage Against The Machine	Alternatif	00:03:29	2024-09-26 08:52:26.273722
9	Sleep now in the fire	Rage Against The Machine	Alternatif	00:03:25	2024-09-26 08:52:57.037092
10	Around the world	Red Hot Chili Peppers	Rock fusion	00:03:58	2024-09-26 08:55:14.045221
11	Get on top	Red Hot Chili Peppers	Rock fusion	00:03:18	2024-09-26 08:55:33.468384
12	Otherside	Red Hot Chili Peppers	Rock fusion	00:04:15	2024-09-26 08:55:55.379302
13	Porcelain	Red Hot Chili Peppers	Rock fusion	00:04:00	2024-09-26 08:56:18.210864
14	Parrallele Universe	Red Hot Chili Peppers	Rock fusion	00:04:30	2024-09-26 08:56:51.012783
15	Megadose	Vald	Rap	00:03:46	2024-09-26 08:58:01.37262
16	L.D.S	Vald	Rap	00:03:52	2024-09-26 08:58:45.84372
17	Totem	Vald	Rap	00:02:34	2024-09-26 09:00:05.941429
18	Lezarman	Vald	Rap	00:03:16	2024-09-26 09:00:57.01474
19	Breathe	Pink Floyd	Rock	00:02:49	2024-09-26 09:02:40.847834
20	Money	Pink Floyd	Rock	00:06:22	2024-09-26 09:02:57.183473
21	Time	Pink Floyd	Rock	00:07:06	2024-09-26 09:03:19.567319
22	On the run	Pink Floyd	Rock	00:03:30	2024-09-26 09:03:42.19233
23	Pollution	Limp Bizkit	Nu metal	00:03:52	2024-09-26 09:36:09.453315
24	Stuck	Limp Bizkit	Nu metal	00:05:24	2024-09-26 09:36:31.821683
25	Stink Finger	Limp Bizkit	Nu metal	00:05:24	2024-09-26 09:36:55.430909
26	Indigo Flow	Limp Bizkit	Nu metal	00:05:24	2024-09-26 09:37:21.2303
27	Atterir	Sopico	Pop Rap	00:03:30	2024-09-26 09:41:06.549853
28	Loin	Sopico	Pop Rap	00:03:15	2024-09-26 09:41:23.303371
29	Thème	Sopico	Pop Rap	00:04:43	2024-09-26 09:41:48.561312
30	Avant de partir	Sopico	Pop Rap	00:03:07	2024-09-26 09:42:38.075742
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, created_at, updated_at) FROM stdin;
2	Le F	2024-10-01 07:21:30.217	2024-10-01 07:21:30.218
1	felix	2024-09-30 13:19:25.148901	2024-10-01 07:25:09.54
6	usertest	2024-10-01 08:41:34.388	2024-10-01 08:41:34.388
7	usertest2	2024-10-01 08:46:17.738	2024-10-01 08:46:17.738
9	felixx	2024-10-04 09:59:57.061	2024-10-04 09:59:57.061
10	felox	2024-10-04 10:09:38.029	2024-10-04 10:09:38.029
11	feloxwaz	2024-10-04 10:10:00.795	2024-10-04 10:10:00.795
12	testetst	2024-10-04 15:52:19.86	2024-10-04 15:52:19.86
13	Wazage	2024-10-09 08:30:18.749	2024-10-09 08:30:18.749
\.


--
-- Name: playlist_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.playlist_id_seq', 30, true);


--
-- Name: playlist_song_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.playlist_song_id_seq', 126, true);


--
-- Name: song_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.song_id_seq', 30, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 13, true);


--
-- Name: playlists playlist_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.playlists
    ADD CONSTRAINT playlist_pkey PRIMARY KEY (id);


--
-- Name: playlist_songs playlist_song_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.playlist_songs
    ADD CONSTRAINT playlist_song_pkey PRIMARY KEY (id);


--
-- Name: songs song_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.songs
    ADD CONSTRAINT song_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: playlist_songs playlist_song_id_playlist_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.playlist_songs
    ADD CONSTRAINT playlist_song_id_playlist_fkey FOREIGN KEY (id_playlist) REFERENCES public.playlists(id) ON DELETE CASCADE;


--
-- Name: playlist_songs playlist_song_id_song_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.playlist_songs
    ADD CONSTRAINT playlist_song_id_song_fkey FOREIGN KEY (id_song) REFERENCES public.songs(id) ON DELETE CASCADE;


--
-- Name: playlists playlist_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.playlists
    ADD CONSTRAINT playlist_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

