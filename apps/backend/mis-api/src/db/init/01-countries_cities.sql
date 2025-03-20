--
-- PostgreSQL database dump
--

-- Dumped from database version 15.10
-- Dumped by pg_dump version 15.10

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
-- Name: cities; Type: TABLE; Schema: public; Owner: mis_user
--

CREATE TABLE public.cities (
    city_id integer NOT NULL,
    name_en character varying(255) NOT NULL,
    name_ar character varying(255) NOT NULL,
    code character varying(10) NOT NULL,
    country_id integer NOT NULL
);


ALTER TABLE public.cities OWNER TO mis_user;

--
-- Name: cities_id_seq; Type: SEQUENCE; Schema: public; Owner: mis_user
--

CREATE SEQUENCE public.cities_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cities_id_seq OWNER TO mis_user;

--
-- Name: cities_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mis_user
--

ALTER SEQUENCE public.cities_id_seq OWNED BY public.cities.city_id;


--
-- Name: countries; Type: TABLE; Schema: public; Owner: mis_user
--

CREATE TABLE public.countries (
    country_id integer NOT NULL,
    name_ar character varying(255) NOT NULL,
    name_en character varying(255) NOT NULL,
    code character varying(10) NOT NULL
);


ALTER TABLE public.countries OWNER TO mis_user;

--
-- Name: countries_id_seq; Type: SEQUENCE; Schema: public; Owner: mis_user
--

CREATE SEQUENCE public.countries_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.countries_id_seq OWNER TO mis_user;

--
-- Name: countries_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mis_user
--

ALTER SEQUENCE public.countries_id_seq OWNED BY public.countries.country_id;


--
-- Name: cities id; Type: DEFAULT; Schema: public; Owner: mis_user
--

ALTER TABLE ONLY public.cities ALTER COLUMN city_id SET DEFAULT nextval('public.cities_id_seq'::regclass);


--
-- Name: countries id; Type: DEFAULT; Schema: public; Owner: mis_user
--

ALTER TABLE ONLY public.countries ALTER COLUMN country_id SET DEFAULT nextval('public.countries_id_seq'::regclass);


--
-- Data for Name: cities; Type: TABLE DATA; Schema: public; Owner: mis_user
--

COPY public.cities (city_id, name_en, name_ar, code, country_id) FROM stdin;
1	Sant Julia de Loria	سانت جوليا دي لوريا	06	1
2	Andorra la Vella	أندورا لا فيلا	07	1
3	La Massana	لا ماسانا	04	1
4	Ordino	أوردينو	05	1
5	Canillo	كانيلو	02	1
6	Encamp	نزلوا	03	1
7	Escaldes-Engordany	إسكالديس أنجوردني	08	1
8	Fujairah	الفجيرة	04	2
9	Abu Dhabi	أبو ظبي	01	2
10	Dubai	دبي	03	2
11	Ras Al Khaimah	رأس الخيمة	05	2
12	Umm Al Quwain	ام القيوين	07	2
13	Sharjah	الشارقة	06	2
14	Ajman	عجمان	02	2
15	Paktika	بكتيكا	29	3
16	Farah	فرح	06	3
17	Helmand	هلمند	10	3
18	Kondoz	قندز	24	3
19	Bamian	باميان	05	3
20	Ghowr	غور	09	3
21	Laghman	لغمان	35	3
23	Ghazni	غزنة	08	3
24	Vardak	ورداك	27	3
25	Oruzgan	أوروزغان	39	3
26	Zabol	زابول	28	3
27	Badghis	بادغيس	02	3
28	Badakhshan	بدخشان	01	3
29	Faryab	فارياب	07	3
30	Takhar	تخار	26	3
31	Lowgar	لوجار	17	3
32	Herat	هرات	11	3
33	Daykondi	دايكندي	41	3
34	Sar-e Pol	سار بول	33	3
35	Balkh	بلخ	30	3
36	Kabol	كابول	13	3
37	Nimruz	نيمروز	19	3
38	Kandahar	قندهار	23	3
39	Khowst	خوست	37	3
41	Kapisa	كابيسا	14	3
42	Nangarhar	ننجرهار	18	3
43	Samangan	سامانغان	32	3
44	Paktia	بكتيا	36	3
45	Baghlan	بغلان	03	3
46	Jowzjan	جوزجان	31	3
47	Konar	كونار	34	3
48	Nurestan	نورستان	38	3
52	Panjshir	بانجشير	42	3
53	Saint John	القديس يوحنا	04	4
54	Saint Paul	القديس بول	06	4
55	Saint George	القديس جورج	03	4
56	Saint Peter	القديس بطرس	07	4
57	Saint Mary	القديس ماري	05	4
58	Barbuda	باربودا	01	4
59	Saint Philip	سانت فيليب	08	4
61	Vlore	فلور	51	6
62	Korce	كورتشي	46	6
63	Shkoder	شكودر	49	6
64	Durres	دوريس	42	6
65	Elbasan	الباسان	43	6
66	Kukes	كوكس	47	6
67	Fier	فيير	44	6
68	Berat	بيرات	40	6
69	Gjirokaster	جيروكاستر	45	6
70	Tirane	تيرانا	50	6
71	Lezhe	ليج	48	6
72	Diber	ديبر	41	6
73	Aragatsotn	Aragatsotn	01	7
74	Ararat	أرارات	02	7
75	Kotayk'	كوتايك	05	7
76	Tavush	تافوش	09	7
77	Syunik'	سيونيك	08	7
78	Geghark'unik'	Geghark'unik \\"	04	7
79	Vayots' Dzor	دزوتس دازور	10	7
80	Lorri	Lorri	06	7
81	Armavir	أرمافير	03	7
82	Yerevan	يريفان	11	7
83	Shirak	شيراك	07	7
85	Benguela	بنغيلا	01	9
86	Uige	يجي	15	9
87	Bengo	بنغو	19	9
88	Cuanza Norte	كوانزا نورتي	05	9
89	Malanje	مالانج	12	9
90	Cuanza Sul	كوانزا سول	06	9
91	Huambo	هوامبو	08	9
92	Moxico	موكسيكو	14	9
93	Cuando Cubango	كواندو كوبانجو	04	9
94	Bie	بيي	02	9
95	Huila	هويلا	09	9
96	Lunda Sul	لوندا سول	18	9
98	Zaire	زائير	16	9
99	Cunene	كونين	07	9
100	Lunda Norte	لوندا نورتي	17	9
101	Namibe	ناميبي	13	9
102	Cabinda	كابيندا	03	9
103	Buenos Aires	بوينس آيرس	01	10
104	Cordoba	قرطبة	05	10
105	Entre Rios	انتري ريوس	08	10
106	Salta	سالتا	17	10
107	Jujuy	خوخوي	10	10
108	La Pampa	لا بامبا	11	10
109	Mendoza	مندوزا	13	10
110	Misiones	ميسيونيس	14	10
111	Santa Cruz	سانتا كروز	20	10
112	Santa Fe	سانتا في	21	10
113	Tucuman	توكومان	24	10
114	Corrientes	كورينتس	06	10
115	San Juan	سان خوان	18	10
116	Santiago del Estero	سانتياغو ديل إستيرو	22	10
117	Catamarca	كاتاماركا	02	10
118	Neuquen	نيوكوين	15	10
119	Distrito Federal	وفي مقاطعة الاتحادية	07	10
120	La Rioja	لا ريوخا	12	10
121	Rio Negro	ريو نيغرو	16	10
122	Chubut	شوبوت	04	10
123	San Luis	سان لويس	19	10
124	Tierra del Fuego	تييرا ديل فويغو	23	10
125	Formosa	فورموزا	09	10
126	Chaco	شاكو	03	10
127	Niederosterreich	Niederosterreich	03	11
128	Salzburg	سالزبورغ	05	11
129	Oberosterreich	Oberosterreich	04	11
130	Tirol	تيرول	07	11
131	Karnten	كارنتين	02	11
132	Steiermark	STEIERMARK	06	11
133	Vorarlberg	فورارلبرغ	08	11
134	Wien	فيينا	09	11
135	Burgenland	بورغنلاند	01	11
136	New South Wales	نيو ساوث ويلز	02	12
137	Tasmania	تسمانيا	06	12
138	Western Australia	القسم الغربي من استراليا	08	12
139	Queensland	كوينزلاند	04	12
140	Victoria	فيكتوريا	07	12
141	South Australia	جنوب استراليا	05	12
142	Northern Territory	الإقليم الشمالي	03	12
143	Australian Capital Territory	إقليم العاصمة الأسترالية	01	12
146	Neftcala	نيفتكالا	36	14
147	Xanlar	زانلار	62	14
148	Yevlax	يفلاكس	68	14
149	Agdas	أجداس	04	14
150	Sabirabad	سابيراباد	46	14
151	Yardimli	يارديملي	66	14
152	Calilabad	Calilabad	15	14
153	Saatli	ساتلي	45	14
154	Saki	الساقي	47	14
155	Kurdamir	كوردامير	27	14
156	Qazax	كازاكس	40	14
157	Tovuz	توفوز	58	14
158	Samkir	سامكير	51	14
159	Agdam	أغدام	03	14
160	Qubadli	كوبادلي	43	14
161	Oguz	أوغوز	37	14
162	Lacin	لاكين	28	14
163	Kalbacar	كالباكار	26	14
164	Haciqabul	Haciqabul	23	14
165	Bilasuvar	بيلاسوفار	13	14
166	Balakan	بالاكان	10	14
167	Naxcivan	ناخيتشيفان	35	14
168	Qabala	قابالا	38	14
169	Agcabadi	أجكابادي	02	14
170	Samaxi	ساماكسي	50	14
171	Davaci	دافاسي	17	14
172	Quba	قباء	42	14
173	Qusar	كوسار	44	14
174	Imisli	إيميسلي	24	14
175	Abseron	أبسيرون	01	14
176	Xacmaz	زاكماز	60	14
177	Cabrayil	كابرايل	14	14
178	Ismayilli	إيسمييلي	25	14
179	Goranboy	غورانبوي	21	14
180	Fuzuli	فضولي	18	14
181	Baki	باكي	09	14
182	Beylaqan	بيلاكان	12	14
183	Daskasan	داسكاسان	16	14
184	Masalli	ماسالي	32	14
185	Zaqatala	زاكاتالا	70	14
186	Lankaran	نكران	29	14
187	Lerik	ليريك	31	14
188	Ali Bayramli	علي بيرملي	07	14
189	Qax	QAX	39	14
190	Samux	ساموكس	52	14
191	Zardab	زارداب	71	14
192	Gadabay	جاداباي	19	14
193	Ucar	أوكار	59	14
194	Barda	بردا	11	14
195	Siyazan	سيازان	53	14
196	Xocavand	كسوكافاند	65	14
197	Zangilan	زانجيلان	69	14
198	Xizi	XIZI	63	14
199	Yevlax	يفلاكس	67	14
200	Agsu	AGSU	06	14
201	Qobustan	كوبستان	41	14
202	Goycay	جويكاي	22	14
203	Astara	أستارا	08	14
204	Xocali	كسوكالي	64	14
205	Xankandi	زانكاندي	61	14
206	Tartar	رواسب	57	14
207	Agstafa	أجستافا	05	14
208	Salyan	ساليان	49	14
209	Susa	سوسة	55	14
210	Ganca	غانكا	20	14
211	Sumqayit	سامكيت	54	14
212	Saki	الساقي	48	14
213	Naftalan	نفتالان	34	14
214	Lankaran	نكران	30	14
215	Mingacevir	مينغاشفير	33	14
216	Susa	سوسة	56	14
217	Republika Srpska	جمهورية صربسكا	02	15
218	Federation of Bosnia and Herzegovina	اتحاد البوسنة والهرسك	01	15
220	Saint Joseph	القديس يوسف	06	16
221	Saint Lucy	سانت لوسي	07	16
222	Saint Thomas	سانت توماس	11	16
223	Saint James	جيمس قديس	04	16
224	Saint John	القديس يوحنا	05	16
225	Saint Peter	القديس بطرس	09	16
347	Karuzi	كاروزي	14	22
226	Christ Church	كنيسة المسيح	01	16
227	Saint George	القديس جورج	03	16
228	Saint Michael	القديس مايكل	08	16
229	Saint Andrew	القديس أندرو	02	16
230	Saint Philip	سانت فيليب	10	16
231	Khulna	خولنا	82	17
232	Rajshahi	راجشاهي	83	17
233	Dhaka	دكا	81	17
235	Barisal	باريسال	85	17
236	Sylhet	سيلهيت	86	17
237	Chittagong	شيتاغونغ	84	17
238	Oost-Vlaanderen	فلاندر الشرقية	08	18
239	West-Vlaanderen	فلاندر الغربية	09	18
241	Limburg	ليمبورغ	05	18
242	Antwerpen	أنتويرب	01	18
243	Luxembourg	لوكسمبورغ	06	18
244	Hainaut	ليمبورغ	03	18
245	Liege	مرتبط ب	04	18
246	Namur	نامور	07	18
247	Brussels Hoofdstedelijk Gewest	بروكسل Hoofdstedelijk Gewest	11	18
248	Vlaams-Brabant	فلامس برابانت	12	18
249	Brabant Wallon	برابانت الوالون	10	18
251	Mouhoun	موهون	63	19
252	Bam	بام	15	19
257	Tapoa	تابوا	42	19
258	Soum	سوم	40	19
259	Leraba	يرابا	61	19
260	Noumbiel	نومبيل	67	19
262	Gnagna	جناجنا	21	19
265	Yatenga	ياتينجا	76	19
266	Banwa	بانوا	46	19
267	Poni	بوني	69	19
268	Loroum	وروم	62	19
269	Kouritenga	كوريتنجا	28	19
270	Tuy	توي	74	19
271	Kossi	كوسي	58	19
272	Passore	باسور	34	19
273	Kenedougou	كيندوجو	54	19
274	Bale	بالة	45	19
275	Bougouriba	بوغوريبا	48	19
276	Houet	هويت	51	19
277	Gourma	جورما	50	19
278	Namentenga	نامنتنجا	64	19
279	Sanmatenga	سانماتينغا	70	19
281	Ioba	إيوبا	52	19
282	Ganzourgou	غانزورغو	20	19
283	Naouri	الناعوري	65	19
284	Boulkiemde	بولكيمد	19	19
285	Zoundweogo	زوندويجو	44	19
286	Zondoma	زوندوما	78	19
289	Komoe	Komoe	55	19
290	Yagha	ياغا	75	19
291	Komondjari	كوموندجاري	56	19
292	Sourou	سورو	73	19
293	Nayala	نايالا	66	19
294	Sissili	سيسيلي	72	19
295	Sanguie	سانجوي	36	19
296	Oudalan	أودالان	33	19
297	Koulpelogo	كولبيلوجو	59	19
298	Ziro	زيرو	77	19
299	Kourweogo	كورويجو	60	19
300	Oubritenga	أوبريتنغا	68	19
301	Seno	سينو	71	19
302	Bazega	بازيجا	47	19
303	Kadiogo	كاديوغو	53	19
304	Kompienga	كومبينغا	57	19
305	Boulgou	بولغو	49	19
306	Lovech	لوفيتش	46	20
307	Varna	فارنا	61	20
308	Burgas	بورغاس	39	20
309	Razgrad	رازغراد	52	20
310	Plovdiv	بلوفديف	51	20
311	Khaskovo	Khaskovo	43	20
312	Sofiya	SOFIYA	58	20
313	Silistra	سيليسترا	55	20
314	Vidin	فيدين	63	20
315	Montana	مونتانا	47	20
316	Mikhaylovgrad	Mikhaylovgrad	33	20
317	Grad Sofiya	جراد صوفيا	42	20
318	Turgovishte	تارغوفيشته	60	20
319	Kurdzhali	Kurdzhali	44	20
320	Dobrich	دوبريتش	40	20
321	Shumen	شومين	54	20
322	Blagoevgrad	بلاغويفغارد	38	20
323	Smolyan	سموليان	57	20
324	Stara Zagora	ستارا زاغورا	59	20
325	Pazardzhik	بازارجيك	48	20
326	Ruse	حيلة	53	20
327	Vratsa	فراتسا	64	20
328	Pleven	بليفين	50	20
329	Pernik	برنيك	49	20
330	Kyustendil	كيوستينديل	45	20
331	Yambol	يامبول	65	20
332	Gabrovo	غابروفو	41	20
333	Sliven	سليفن	56	20
334	Veliko Turnovo	فيليكو ترنوفو	62	20
335	Jidd Hafs	جد حفص	05	21
337	Al Mintaqah ash Shamaliyah	المنطقة الشمالية	10	21
339	Al Manamah	المنامة	02	21
340	Sitrah	سترة	06	21
341	Al Mintaqah al Gharbiyah	المنطقة الغربية	08	21
342	Mintaqat Juzur Hawar	ولاية جزرور حوار	09	21
343	Al Hadd	الحد	01	21
344	Al Mintaqah al Wusta	المنطقة الوسطى	11	21
345	Ar Rifa	الرفاع	13	21
346	Madinat	مدينة	12	21
348	Ruyigi	رويجي	21	22
349	Bubanza	بوبانزا	09	22
350	Bururi	بوروري	10	22
351	Makamba	ماكامبا	17	22
352	Kayanza	كاينزا	15	22
354	Rutana	روتانا	20	22
355	Muyinga	مويينغا	18	22
356	Cibitoke	سيبيتوكييه	12	22
357	Gitega	غيتيغا	13	22
358	Cankuzo	كانكوزا	11	22
359	Bujumbura	بوجمبورا	02	22
360	Ngozi	نغوزي	19	22
361	Kirundo	كيروندو	16	22
362	Plateau	هضبة	17	23
363	Collines	التلال	11	23
366	Oueme	أويمي	16	23
367	Zou	زو	18	23
370	Atlanyique	Atlanyique	09	23
371	Borgou	بورغو	10	23
372	Mono	مونو	15	23
374	Kouffo	كوفو	12	23
375	Donga	دونجا	13	23
376	Littoral	ساحلي	14	23
377	Alibori	أليبوري	07	23
378	Atakora	أتاكورا	08	23
379	Devonshire	ديفونشاير	01	24
380	Paget	باجيت	04	24
381	Saint George's	سانت جورج	07	24
382	Smiths	الحدادون	09	24
383	Hamilton	هاميلتون	03	24
384	Warwick	وارويك	11	24
385	Sandys	سانديز	08	24
386	Saint George	القديس جورج	06	24
387	Hamilton	هاميلتون	02	24
389	Santa Cruz	سانتا كروز	08	26
390	Pando	باندو	06	26
391	Tarija	تاريخا	09	26
392	La Paz	لاباز	04	26
393	Oruro	أورورو	05	26
394	Cochabamba	كوتشابامبا	02	26
395	Potosi	بوتوسي	07	26
396	Chuquisaca	شوكيساكا	01	26
397	El Beni	البنى	03	26
398	Santa Catarina	سانتا كاتارينا	26	27
399	Mato Grosso do Sul	ماتو جروسو دو سول	11	27
400	Rio Grande do Sul	ريو غراندي دو سول	23	27
401	Espirito Santo	اسبيريتو سانتو	08	27
402	Bahia	باهيا	05	27
403	Rondonia	روندونيا	24	27
404	Minas Gerais	ميناس جيرايس	15	27
405	Paraiba	بارايبا	17	27
406	Amapa	أمابا	03	27
407	Amazonas	أمازوناس	04	27
408	Para	الفقرة	16	27
409	Ceara	سيارا	06	27
410	Rio de Janeiro	ريو دي جانيرو	21	27
411	Goias	غوياس	29	27
412	Sao Paulo	ساو باولو	27	27
413	Parana	بارانا	18	27
414	Rio Grande do Norte	ريو غراندي دو نورتي	22	27
415	Acre	فدان	01	27
416	Piaui	بياوي	20	27
417	Pernambuco	بيرنامبوكو	30	27
418	Mato Grosso	ماتو جروسو	14	27
419	Maranhao	مارانهاو	13	27
420	Tocantins	توكانتينز	31	27
421	Roraima	رورايما	25	27
422	Alagoas	ألاغواس	02	27
423	Sergipe	سيرغيبي	28	27
424	Distrito Federal	وفي مقاطعة الاتحادية	07	27
425	Acklins and Crooked Islands	Acklins and Crooked Islands	24	28
426	Mayaguana	ماياجيوانا	16	28
427	Long Island	جزيرة طويلة	15	28
428	New Providence	بروفيدانس الجديدة	23	28
429	Exuma	اكسوما	10	28
430	Bimini	بيميني	05	28
431	Governor's Harbour	ميناء الحاكم	27	28
432	San Salvador and Rum Cay	سان سلفادور وروم كاي	35	28
433	Fresh Creek	فريش كريك	26	28
434	Cat Island	جزيرة القط	06	28
435	Nichollstown and Berry Islands	Nichollstown و جزر بيري	32	28
436	Kemps Bay	كيمبس باي	30	28
437	Freeport	ميناء حر	25	28
438	Rock Sound	صوت صخري	33	28
439	Harbour Island	جزيرة الميناء	22	28
440	High Rock	هاي روك	29	28
441	Green Turtle Cay	جرين تيرتل كاي	28	28
442	Marsh Harbour	مارش هاربر	31	28
443	Ragged Island	جزيرة راكد	18	28
444	Sandy Point	ساندي بوينت	34	28
445	Inagua	من Inagua	13	28
446	Wangdi Phodrang	وانجدي Phodrang	22	29
447	Paro	بارو	13	29
448	Daga	داغا	08	29
449	Mongar	مونغار	12	29
450	Shemgang	Shemgang	18	29
451	Thimphu	تيمفو	20	29
452	Tashigang	Tashigang	19	29
453	Chirang	شيرانغ	07	29
454	Geylegphug	Geylegphug	09	29
455	Samdrup	سامدروب	17	29
456	Bumthang	بوم ثانج	05	29
457	Samchi	Samchi	16	29
458	Tongsa	Tongsa	21	29
459	Chhukha	جوخا	06	29
460	Pemagatsel	Pemagatsel	14	29
461	Ha	ها	10	29
462	Punakha	بونخا	15	29
463	Lhuntshi	Lhuntshi	11	29
464	Central	وسط	01	30
465	South-East	الجنوب الشرقي	09	30
466	North-East	شمال شرق	08	30
467	North-West	الشمال الغربي	11	30
468	Ghanzi	غانزي	03	30
469	Kweneng	كوينينج	06	30
470	Kgalagadi	كغالاغادي	04	30
472	Southern	جنوبي	10	30
473	Kgatleng	كجاتلينج	05	30
474	Homyel'skaya Voblasts'	Homyel'skaya Voblasts \\"	02	31
475	Minsk	مينسك	04	31
476	Brestskaya Voblasts'	Brestskaya Voblasts \\"	01	31
477	Hrodzyenskaya Voblasts'	هيرودزينسكايا فوبلاست	03	31
478	Mahilyowskaya Voblasts'	Mahilyowskaya Voblasts \\"	06	31
479	Vitsyebskaya Voblasts'	Vitsyebskaya Voblasts \\"	07	31
480	Toledo	توليدو	06	32
481	Cayo	كايو	02	32
482	Stann Creek	ستان كريك	05	32
483	Corozal	كوروزال	03	32
484	Orange Walk	أورانج ووك	04	32
485	Belize	بليز	01	32
500	Equateur	خط الاستواء	02	35
501	Orientale	الشرقية	09	35
503	Nord-Kivu	شمال كيفو	11	35
505	Maniema	مانيما	10	35
506	Bandundu	باندوندو	01	35
508	Katanga	كاتانغا	05	35
509	Sud-Kivu	جنوب كيفو	12	35
510	Bas-Congo	الكونغو السفلى	08	35
511	Kasai-Oriental	كاساي الشرقية	04	35
512	Kinshasa	كينشاسا	06	35
513	Nana-Mambere	نانا مامبيري	09	36
514	Ouaka	أواكا	11	36
515	Haute-Kotto	كوتو العليا	03	36
516	Sangha-Mbaere	سانغا مباري	16	36
517	Bamingui-Bangoran	بامينغي-بانغوران	01	36
518	Mbomou	مبومو	08	36
519	Basse-Kotto	باس كوتو	02	36
520	Kemo	كيمو	06	36
521	Haut-Mbomou	هوت مبومو	05	36
522	Ouham-Pende	أوهام بندي	13	36
523	Ouham	أوهام	12	36
524	Ombella-Mpoko	أومبلا مبوكي	17	36
525	Cuvette-Ouest	كفيت-كويست	14	36
526	Mambere-Kadei	مامبري كادي	04	36
527	Lobaye	وباي	07	36
529	Nana-Grebizi	نانا غريبيزي	15	36
530	Bangui	بانغي	18	36
532	Plateaux	الهضاب	08	37
533	Pool	حوض السباحة	11	37
534	Sangha	سانغا	10	37
535	Lekoumou	يكومو	05	37
536	Likouala	يكوالا	06	37
537	Kouilou	كويلو	04	37
538	Niari	نياري	07	37
539	Bouenza	بوينزا	01	37
540	Brazzaville	برازافيل	12	37
541	Cuvette-Ouest	كفيت-كويست	14	37
542	Cuvette	كفيت	13	37
543	Thurgau	ثورجو	19	38
544	Aargau	أرجاو	01	38
545	Bern	برن	05	38
546	Zurich	زيوريخ	25	38
547	Fribourg	فريبورغ	06	38
548	Ausser-Rhoden	Ausser-رودين	02	38
549	Valais	فاليه	22	38
550	Uri	أوري	21	38
551	Graubunden	غراوبوندن	09	38
552	Ticino	تيسان	20	38
553	Luzern	لوزيرن	11	38
554	Obwalden	أوبوالدن	14	38
555	Solothurn	سولوتورن	18	38
556	Basel-Stadt	بازل شتات	04	38
557	Inner-Rhoden	الداخلية-رودين	10	38
558	Zug	زوغ	24	38
559	Vaud	فو	23	38
560	Jura	العصر الجوارسي أو الجوري	26	38
561	Basel-Landschaft	كانتون ريف بازل	03	38
562	Schwyz	شفيتس	17	38
563	Sankt Gallen	سانكت غالن	15	38
564	Schaffhausen	شافهاوزن	16	38
565	Glarus	جلاروس	08	38
566	Geneve	جنيف	07	38
567	Neuchatel	نيوشاتل	12	38
568	Nidwalden	نيدوالدن	13	38
579	Vallee du Bandama	فالي دو بانداما	90	39
581	N'zi-Comoe	N'zi كومو	86	39
585	Moyen-Comoe	موين كومو	85	39
587	Lagunes	اجونيه	82	39
588	Zanzan	زانزان	92	39
589	Sud-Comoe	سود كومو	89	39
590	Lacs	البحيرات	81	39
598	Fromager	فورماجر	79	39
600	Agneby	Agneby	74	39
601	Bas-Sassandra	بس ساساندرا	76	39
603	Marahoue	مراهو	83	39
608	Bafing	بافنج	75	39
614	Savanes	السافانا	87	39
619	Sud-Bandama	سود بانداما	88	39
620	Haut-Sassandra	أوت ساساندرا	80	39
621	Moyen-Cavally	موين كافالي	84	39
622	Dix-Huit Montagnes	ديكس - هويت مونتاجنيس	78	39
623	Denguele	دانغيل	77	39
624	Worodougou	ورودوجو	91	39
626	Bio-Bio	بيو بيو	06	41
627	Maule	مولي	11	41
628	Los Lagos	لوس لاغوس	09	41
629	Tarapaca	تاراباكا	13	41
630	Valparaiso	فالبارايسو	01	41
631	Atacama	أتاكاما	05	41
632	Coquimbo	كوكيمبو	07	41
633	Libertador General Bernardo O'Higgins	Libertador General Bernardo O'Higgins	08	41
634	Antofagasta	أنتوفاغاستا	03	41
635	Araucania	أراوكاريا	04	41
636	Aisen del General Carlos Ibanez del Campo	Aisen del General Carlos Ibanez del Campo	02	41
637	Region Metropolitana	منطقة متروبوليتانا	12	41
638	Magallanes y de la Antartica Chilena	Magallanes y de la Antartica Chilena	10	41
639	Est	EST	04	42
640	Adamaoua	أداماوا	10	42
641	Centre	مركز	11	42
642	Sud	سود	14	42
643	Nord-Ouest	الإقليم الشمالي الغربي	07	42
644	Extreme-Nord	المتطرف نور	12	42
645	Sud-Ouest	الإقليم الجنوبي الغربي	09	42
646	Littoral	ساحلي	05	42
647	Nord	نورد	13	42
648	Ouest	كويست	08	42
649	Sichuan	سيتشوان	32	43
650	Xinjiang	شينجيانغ	13	43
651	Nei Mongol	ني المغول	20	43
652	Yunnan	يونان	29	43
653	Guizhou	قويتشو	18	43
654	Heilongjiang	هيلونغجيانغ	08	43
655	Shandong	شاندونغ	25	43
656	Liaoning	لياونينغ	19	43
657	Shaanxi	شنشى	26	43
658	Qinghai	تشينغهاي	06	43
659	Gansu	قانسو	15	43
660	Jiangsu	جيانغسو	04	43
661	Fujian	فوجيان	07	43
662	Hunan	هونان	11	43
663	Jiangxi	جيانغشى	03	43
664	Guangxi	قوانغشى	16	43
665	Zhejiang	تشجيانغ	02	43
666	Hebei	خبى	10	43
667	Hubei	هوبى	12	43
668	Anhui	انهوى	01	43
669	Tianjin	تيانجين	28	43
670	Hainan	هاينان	31	43
671	Guangdong	قوانغدونغ	30	43
672	Xizang	زيزانغ	14	43
673	Jilin	جيلين	05	43
674	Chongqing	تشونغتشينغ	33	43
675	Beijing	بكين	22	43
676	Shanxi	شانشى	24	43
677	Shanghai	شنغهاي	23	43
678	Henan	خنان	09	43
679	Ningxia	نينغشيا	21	43
680	Cundinamarca	كونديناماركا	33	44
681	Norte de Santander	نورتي دي سانتاندر	21	44
682	Narino	نارينو	20	44
684	Risaralda	ريزارالدا	24	44
685	Antioquia	أنتيوكيا	02	44
686	Amazonas	أمازوناس	01	44
687	La Guajira	لا غواخيرا	17	44
688	Choco	شوكو	11	44
689	Cauca	كاوكا	09	44
690	Valle del Cauca	فالي ديل كاوكا	29	44
691	Arauca	اروكا	03	44
692	Meta	ميتا	19	44
693	Caqueta	كاكويتا	08	44
694	Casanare	كازاناري	32	44
695	Vaupes	فاوبيس	30	44
696	Tolima	توليما	28	44
697	Huila	هويلا	16	44
699	Atlantico	اتلانتيكو	04	44
700	Cordoba	قرطبة	12	44
701	Santander	سانتاندر	26	44
702	Cesar	سيزار	10	44
703	Sucre	سوكري	27	44
705	Putumayo	بوتومايو	22	44
707	Guaviare	غوابياري	14	44
708	San Andres y Providencia	San Andres y Providencia	25	44
709	Vichada	فيتشادا	31	44
710	Quindio	كوينديو	23	44
711	Guainia	غواينيا	15	44
712	Distrito Especial	Distrito Especial	34	44
713	Guanacaste	غواناكاست	03	45
714	Limon	ليمون	06	45
715	Puntarenas	بونتاريناس	07	45
716	Alajuela	ألاخويلا	01	45
717	Heredia	هيريديا	04	45
718	San Jose	سان خوسيه	08	45
719	Cartago	قرطاج	02	45
720	Cienfuegos	سيينفويغوس	08	46
721	La Habana	لا هافانا	11	46
722	Santiago de Cuba	سانتياغو دي كوبا	15	46
723	Camaguey	كاماغواي	05	46
724	Ciudad de la Habana	سيوداد دي لا هافانا	02	46
725	Villa Clara	فيلا كلارا	16	46
726	Pinar del Rio	بينار ديل ريو	01	46
727	Matanzas	ماتانزاس	03	46
728	Guantanamo	غوانتانامو	10	46
729	Las Tunas	لاس توناس	13	46
730	Ciego de Avila	سييغو دي أفيلا	07	46
731	Sancti Spiritus	سانكتي سبيريتوس	14	46
732	Holguin	هولغوين	12	46
733	Granma	غرانما	09	46
734	Isla de la Juventud	جزيرة دي لا جوفينتود	04	46
735	Sao Domingos	ساو دومينغوس	17	47
738	Limassol	ليماسول	05	49
739	Nicosia	نيقوسيا	04	49
740	Paphos	بافوس	06	49
741	Famagusta	فاماغوستا	01	49
742	Larnaca	لارنكا	03	49
743	Kyrenia	كيرينيا	02	49
744	Karlovarsky kraj	كارلوفارسكي كراج	81	50
745	Pardubicky kraj	بردوبيكي كراج	86	50
747	Jihomoravsky kraj	Jihomoravsky كراج	78	50
748	Jihocesky kraj	Jihocesky kraj	79	50
749	Olomoucky kraj	أولوموكي كراج	84	50
750	Moravskoslezsky kraj	Moravskoslezsky كراج	85	50
752	Kralovehradecky kraj	Kralovehradecky كراج	82	50
753	Ustecky kraj	أوستيكي كراج	89	50
754	Stredocesky kraj	Stredocesky كراج	88	50
755	Vysocina	فيسوسينا	80	50
756	Plzensky kraj	Plzensky كراج	87	50
760	Zlinsky kraj	زلينسكي كراج	90	50
761	Hlavni mesto Praha	هلفني ميستو براها	52	50
763	Liberecky kraj	Liberecky كراج	83	50
773	Nordrhein-Westfalen	نوردراين فيستفالن	07	51
774	Baden-Wurttemberg	بادن فورتمبيرغ	01	51
775	Bayern	بايرن ميونيخ	02	51
776	Rheinland-Pfalz	راينلاند-بفالز	08	51
777	Niedersachsen	Niedersachsen	06	51
778	Schleswig-Holstein	شليسفيغ هولشتاين	10	51
779	Brandenburg	براندنبورغ	11	51
780	Sachsen-Anhalt	سكسونيا أنهالت	14	51
781	Sachsen	ساكسن	13	51
782	Thuringen	THÜRINGEN	15	51
783	Hessen	هيسن	05	51
784	Mecklenburg-Vorpommern	مكلنبورغ-فوربومرن	12	51
785	Hamburg	هامبورغ	04	51
786	Berlin	البرلينية	16	51
787	Saarland	سارلاند	09	51
788	Bremen	بريمن	03	51
789	Ali Sabieh	علي صبيح	01	52
790	Tadjoura	تاجورا	05	52
792	Obock	أوبوك	04	52
794	Arta	أرتا	08	52
795	Dikhil	دخيل	06	52
796	Syddanmark	سيدانمارك	21	53
797	Midtjylland	ميتجيلاند	18	53
798	Nordjylland	نوردلاند	19	53
799	Sjelland	Sjelland	20	53
800	Hovedstaden	هوفدستادين	17	53
801	Saint Andrew	القديس أندرو	02	54
802	Saint David	القديس داود	03	54
803	Saint Joseph	القديس يوسف	06	54
804	Saint George	القديس جورج	04	54
805	Saint Patrick	سانت باتريك	09	54
806	Saint Peter	القديس بطرس	11	54
807	Saint John	القديس يوحنا	05	54
808	Saint Mark	سان مارك	08	54
809	Saint Paul	القديس بول	10	54
810	Saint Luke	القديس لوقا	07	54
811	Sanchez Ramirez	سانشيز راميريز	21	55
812	Espaillat	إسبايلات	08	55
813	Duarte	دوارتي	06	55
814	Samana	سمانا	20	55
815	Maria Trinidad Sanchez	ماريا ترينيداد سانشيز	14	55
816	La Romana	لا رومانا	12	55
817	Azua	ازوا	01	55
818	San Cristobal	سان كريستوبال	33	55
819	El Seibo	الصيبو	28	55
820	Monte Plata	مونت بلاتا	32	55
821	Distrito Nacional	Distrito Nacional	05	55
822	Elias Pina	إلياس بينا	11	55
823	Santiago	سانتياغو	25	55
824	Santiago Rodriguez	سانتياغو رودريجيز	26	55
825	Peravia	بيرافيا	17	55
826	Monte Cristi	مونت كريستي	15	55
827	Salcedo	سالسيدو	19	55
828	Puerto Plata	بويرتو بلاتا	18	55
829	San Pedro De Macoris	سان بيدرو دي ماكوريس	24	55
830	Pedernales	بدرنالس	16	55
831	Independencia	الاستقلال	09	55
832	La Vega	لا فيغا	30	55
833	Dajabon	داجابون	04	55
834	Hato Mayor	حاتو العمدة	29	55
943	Suhaj	سوهاج	24	59
835	Barahona	باراهونا	03	55
836	San Juan	سان خوان	23	55
837	La Altagracia	لا التاغراسيا	10	55
838	Valverde	فالفيردي	27	55
839	Baoruco	Baoruco	02	55
840	Monsenor Nouel	مونسنور نويل	31	55
841	Ain Temouchent	عين تموشنت	36	56
842	Oran	وهران	09	56
843	Medea	المدية	06	56
844	Chlef	الشلف	41	56
845	Bechar	بشار	38	56
846	Tamanghasset	تمنراست	53	56
847	Bejaia	بجاية	18	56
848	Tizi Ouzou	تيزي وزو	14	56
849	Boumerdes	بومرداس	40	56
850	Ain Defla	عين الدفلة	35	56
851	Annaba	عنابة	37	56
852	Setif	سطيف	12	56
853	Relizane	غليزان	51	56
854	Mascara	ماسكارا	26	56
855	Mostaganem	مستغانم	07	56
856	Tiaret	تيارت	13	56
857	Bordj Bou Arreridj	برج بوعريريج	39	56
858	Tipaza	تيبازة	55	56
860	Bouira	البويرة	21	56
861	Tissemsilt	تيسمسيلت	56	56
862	Jijel	جيجل	24	56
863	Saida	صيدا	10	56
864	Illizi	إليزي	46	56
865	Tlemcen	تلمسان	15	56
866	Adrar	أدرار	34	56
867	Laghouat	الأغواط	25	56
868	Constantine	قسنطينة	04	56
869	Khenchela	خنشلة	47	56
870	Batna	باتنة	03	56
871	Alger	الجزائر	01	56
872	M'sila	مسيلة	27	56
873	Skikda	سكيكدة	31	56
874	Oum el Bouaghi	ام البواقي	29	56
875	Naama	نعمة	49	56
876	Sidi Bel Abbes	سيدي بلعباس	30	56
877	Mila	ميلة	48	56
878	Ouargla	ورقلة	50	56
879	Djelfa	الجلفة	22	56
880	El Bayadh	البيض	42	56
881	Souk Ahras	سوق أهراس	52	56
882	El Oued	الواد	43	56
883	Blida	البليدة	20	56
884	Biskra	بسكرة	19	56
885	Tebessa	تبسة	33	56
886	Guelma	قالمة	23	56
887	Tindouf	تندوف	54	56
888	Ghardaia	غرداية	45	56
889	Manabi	مانابي	14	57
890	Zamora-Chinchipe	زامورا-شينشيب	20	57
891	Morona-Santiago	مورونا سانتياغو	15	57
892	El Oro	اورو	08	57
893	Azuay	ازواي	02	57
894	Sucumbios	سوكومبيوس	22	57
895	Guayas	غواياس	10	57
896	Los Rios	لوس ريوس	13	57
897	Loja	وخا	12	57
898	Chimborazo	شيمبورازو	06	57
899	Tungurahua	تونغوراهوا	19	57
900	Esmeraldas	ازميرالدا	09	57
901	Pichincha	بيشينشا	18	57
902	Imbabura	إمبابورا	11	57
903	Cotopaxi	كوتوباكسي	07	57
904	Carchi	كارشي	05	57
905	Napo	نابو	23	57
906	Canar	كنار	04	57
907	Pastaza	باستازا	17	57
908	Orellana	أوريانا	24	57
909	Bolivar	بوليفار	03	57
910	Galapagos	غالاباغوس	01	57
911	Harjumaa	Harjumaa	01	58
912	Tartumaa	تارتوما	18	58
913	Hiiumaa	هيوما	02	58
914	Raplamaa	رابلاما	13	58
915	Valgamaa	فلغما	19	58
916	Laanemaa	انيما	07	58
917	Polvamaa	بولفاما	12	58
918	Parnumaa	بارنوما	11	58
919	Laane-Virumaa	اني فيريوما	08	58
920	Jarvamaa	يارفا	04	58
921	Viljandimaa	فيلجاندي	20	58
922	Saaremaa	ساريما	14	58
923	Jogevamaa	جوغفما	05	58
924	Ida-Virumaa	المؤسسة الدولية للتنمية فيروما	03	58
925	Vorumaa	فوروما	21	58
926	Ash Sharqiyah	الشرقية	14	59
927	Al Gharbiyah	الغربية	05	59
928	Ad Daqahliyah	الدقهلية	01	59
929	Al Jizah	الجيزة	08	59
930	Al Minya	المنيا	10	59
931	Kafr ash Shaykh	كفر الشيخ	21	59
932	Al Buhayrah	البحيرة	03	59
933	Qina	قنا	23	59
934	Al Qahirah	القاهره	11	59
935	Al Iskandariyah	الاسكندرية	06	59
936	Al Fayyum	الفيوم	04	59
937	Asyut	أسيوط	17	59
938	Al Minufiyah	المنوفية	09	59
939	Bani Suwayf	بني سويف	18	59
940	Al Qalyubiyah	القليوبية	12	59
941	Aswan	أسوان	16	59
942	Shamal Sina'	شمال سينا	27	59
944	Janub Sina'	جنوب سينا	26	59
945	Al Bahr al Ahmar	البحر الاحمر	02	59
946	Al Isma'iliyah	الاسماعيلية	07	59
947	Dumyat	دمياط	20	59
948	Matruh	مطروح	22	59
949	As Suways	السويس	15	59
950	Al Wadi al Jadid	الوادي الجديد	13	59
951	Bur Sa'id	بور سعيد	19	59
954	Aragon	أراغون	52	62
955	Galicia	غاليسيا	58	62
956	Castilla y Leon	كاستيا ي ليون	55	62
957	Extremadura	إكستريمادورا	57	62
958	Pais Vasco	بايس فاسكو	59	62
959	Cantabria	كانتابريا	39	62
960	Navarra	نافارا	32	62
961	Asturias	أستورياس	34	62
962	La Rioja	لا ريوخا	27	62
963	Castilla-La Mancha	كاستيا لا مانشا	54	62
964	Murcia	مورسيا	31	62
965	Andalucia	الأندلس	51	62
966	Comunidad Valenciana	Comunidad فالنسيانا	60	62
967	Catalonia	كاتالونيا	56	62
968	Canarias	جزر الكناري	53	62
969	Madrid	مدريد	29	62
970	Islas Baleares	ايسلاس باليريس	07	62
984	Oulu	أولو	08	64
985	Western Finland	فنلندا الغربية	15	64
986	Lapland	ابلاند	06	64
987	Eastern Finland	شرق فنلندا	14	64
988	Southern Finland	جنوب فنلندا	13	64
989	Aland	أرض	01	64
992	Northern	شمالي	03	65
993	Western	الغربي	05	65
994	Central	وسط	01	65
995	Eastern	الشرقية	02	65
997	Yap	ثرثرة	04	67
998	Pohnpei	بوهنباي	02	67
999	Chuuk	شوك	03	67
1000	Kosrae	كوسراي	01	67
1002	Aquitaine	آكيتن	97	69
1003	Nord-Pas-de-Calais	نور-با-دو-كاليه	B4	69
1004	Lorraine	لورين	B2	69
1005	Haute-Normandie	هوت نورماندي	A7	69
1006	Picardie	بيكاردي	B6	69
1007	Franche-Comte	فرانش-كونت	A6	69
1008	Pays de la Loire	باي دو لا لوار	B5	69
1009	Champagne-Ardenne	الشمبانيا اردين	A4	69
1010	Centre	مركز	A3	69
1011	Languedoc-Roussillon	لانغدوك روسيون	A9	69
1012	Poitou-Charentes	بواتو-شارانت	B7	69
1013	Rhone-Alpes	رون ألب	B9	69
1014	Basse-Normandie	باس نورماندي	99	69
1015	Ile-de-France	إيل دو فرانس	A8	69
1016	Bourgogne	بورغون	A1	69
1017	Auvergne	أوفيرني	98	69
1018	Provence-Alpes-Cote d'Azur	بروفانس ألب كوت دازور	B8	69
1019	Corse	كورس	A5	69
1020	Alsace	الألزاس	C1	69
1021	Bretagne	بريتان	A2	69
1022	Midi-Pyrenees	ميدي-بيرينيه	B3	69
1023	Limousin	ليموزين	B1	69
1024	Estuaire	إيستوير	01	70
1025	Woleu-Ntem	ليو نتيم	09	70
1026	Moyen-Ogooue	موين-أوغوي	03	70
1027	Ogooue-Maritime	أوغوي البحرية	08	70
1028	Ogooue-Lolo	أوغوي لولو	07	70
1029	Ogooue-Ivindo	أوجوي إيفندو	06	70
1030	Haut-Ogooue	أوت أوغوي	02	70
1031	Ngounie	نغوني	04	70
1032	Nyanga	النيانغا	05	70
1033	Worcestershire	رسيستيرشاير	Q4	71
1034	Hampshire	هامبشاير	F2	71
1035	Herefordshire	هرفوردشير	F7	71
1036	Essex	إسيكس	E4	71
1037	Powys	بوويز	Y8	71
1038	Monmouthshire	مونماوثشاير	Y4	71
1039	Scottish Borders	الحدود الاسكتلندية	T9	71
1040	Cumbria	كمبريا	C9	71
1041	Devon	ديفون	D4	71
1042	Staffordshire	ستافوردشاير	M9	71
1043	Dorset	دورست	D6	71
1044	Hertford	هيرتفورد	F8	71
1045	Cambridgeshire	كامبريدج	C3	71
1046	Lancashire	لانكشاير	H2	71
1047	Conwy	كونوي	X8	71
1048	Ceredigion	سرديجون	X6	71
1049	Rhondda Cynon Taff	روندا سينون تاف	Y9	71
1050	Highland	هضبة	V3	71
1051	Perth and Kinross	بيرث و كينروس	W1	71
1052	Caerphilly	كيرفيلي	X4	71
1053	Blaenau Gwent	Blaenau Gwent	X2	71
1054	Merthyr Tydfil	ميرثير تيدفيل	Y3	71
1055	Pembrokeshire	بيمبروكشاير	Y7	71
1056	Aberdeenshire	أبردينشاير	T6	71
1057	Gwynedd	جويند	Y2	71
1058	Aberdeen City	مدينة أبردين	T5	71
1059	Fife	ناي آلة موسيقية	V1	71
1060	Neath Port Talbot	نيث بورت تالبوت	Y5	71
1061	Isle of Anglesey	جزيرة انجلسي	X1	71
1062	Wokingham	ووكينغهام	Q2	71
1063	York	يورك	Q5	71
1064	Stirling	ستيرلينغ	W6	71
1065	Carmarthenshire	كرمرثنشير	X7	71
1066	Bridgend	كارديف	X3	71
1067	East Lothian	شرق لوثيان	U6	71
1068	Angus	انجوس	T7	71
1069	Moray	موراي	V6	71
1070	Torfaen	تورفين	Z2	71
1071	Swansea	سوانسي	Z1	71
1072	Vale of Glamorgan	فيل غلامورغان	Z3	71
1073	Oxfordshire	أوكسفوردشاير	K2	71
1074	Surrey	سيارة بمقعدين	N7	71
1075	South Lanarkshire	جنوب لاناركشاير	W5	71
1076	Leicestershire	يسترشير	H5	71
1077	Wigan	ويجان	P7	71
1078	Northamptonshire	نورثهامبتونشاير	J1	71
1079	Lincolnshire	لينكولنشاير	H7	71
1080	Argyll and Bute	أرغيل وبوت	T8	71
1081	Northumberland	نورثمبرلاند	J6	71
1082	Norfolk	نورفولك	I9	71
1083	Solihull	سوليهال	M2	71
1084	Wrexham	ريكسهام	Z4	71
1085	Cheshire	شيشاير	C5	71
1086	Shropshire	شروبشاير	L6	71
1087	Banbridge	بانبريدج	R2	71
1088	South Gloucestershire	جنوب جلوسيسترشاير	M6	71
1089	West Lothian	لوثيان الغربية	W9	71
1091	Kent	كينت	G5	71
1092	Leeds	ليدز	H3	71
1093	Somerset	سومرست	M3	71
1094	Gloucestershire	جلوسيسترشاير	E6	71
1095	Buckinghamshire	باكينجهامشير	B9	71
1096	Coleraine	كوليرين	R6	71
1097	Craigavon	كريجافون	R8	71
1098	Antrim	أنتريم	Q6	71
1099	Limavady	يمافادي	S4	71
1100	Armagh	أرما	Q8	71
1101	Ballymena	بلايميندا	Q9	71
1102	North Yorkshire	شمال يوركشاير	J7	71
1103	Sefton	سيفتون	L8	71
1104	Warwickshire	وارويكشاير	P3	71
1105	Derry	ديري	S6	71
1106	Eilean Siar	ايلين سيار	W8	71
1107	North Lanarkshire	شمال لاناركشاير	V8	71
1108	Falkirk	فالكيرك	U9	71
1109	Shetland Islands	جزر شتلاند	W3	71
1110	Wiltshire	ويلتشير	P8	71
1111	Durham	دورهام	D8	71
1112	Darlington	دارلينجتون	D1	71
1113	Suffolk	سوفولك	N5	71
1114	Derbyshire	ديربيشاير	D3	71
1115	Walsall	والسال	O8	71
1116	Rotherham	روثرهام	L3	71
1117	West Dunbartonshire	غرب دنبارتنشير	W7	71
1118	East Sussex	شرق ساسكس	E2	71
1119	Coventry	كوفنتري	C7	71
1120	Derby	دربي	D2	71
1121	Southend-on-Sea	ساوثيند على البحر	M5	71
1122	Clackmannanshire	كلاكمانشاير	U1	71
1123	Kirklees	كركليس	G8	71
1124	St. Helens	سانت هيلينز	N1	71
1125	Omagh	أوما	T3	71
1126	Cornwall	كورنوال	C6	71
1127	North Lincolnshire	شمال لينكولنشاير	J3	71
1128	Newry and Mourne	نيوري ومورن	S9	71
1129	South Ayrshire	جنوب ايرشاير	W4	71
1130	Isle of Wight	جزيرة وايت	G2	71
1132	Dumfries and Galloway	دومفريز وجالاوي	U2	71
1133	Bedfordshire	بيدفوردشير	A5	71
1134	Down	أسفل	R9	71
1135	Dungannon	دونجانون	S1	71
1136	Renfrewshire	رينفروشاير	W2	71
1137	Leicester	ليستر	H4	71
1138	Glasgow City	مدينة غلاسكو	V2	71
1139	West Sussex	غرب ساسكس	P6	71
1140	Warrington	وارينغتون	P2	71
1141	Cookstown	كوكستاون	R7	71
1142	North Ayrshire	شمال ايرشاير	V7	71
1143	Barnsley	بارنسلي	A3	71
1144	Strabane	استربان	T4	71
1145	Doncaster	دونكاستر	D5	71
1146	Ballymoney	بلموني	R1	71
1147	Fermanagh	فيرماناغ	S2	71
1149	Nottingham	نوتنغهام	J8	71
1151	Tameside	تامسايد	O1	71
1152	Rutland	روتلاند	L4	71
1153	Nottinghamshire	نوتينغمشير	J9	71
1154	Midlothian	ميدلوثيان	V5	71
1155	East Ayrshire	شرق ايرشاير	U4	71
1156	Stoke-on-Trent	ستوك أون ترينت	N4	71
1157	Bristol	بريستول	B7	71
1158	Flintshire	فلينتشير	Y1	71
1159	Blackburn with Darwen	بلاكبيرن مع داروين	A8	71
1160	Moyle	مويلي	S8	71
1161	Carrickfergus	كاريكفرجس	R4	71
1162	Castlereagh	كاسلرا	R5	71
1163	Larne	ليرن	S3	71
1164	Belfast	بلفاست	R3	71
1165	Magherafelt	مايرافلت	S7	71
1166	North Down	شمال داون	T2	71
1167	North Somerset	شمال سومرست	J4	71
1168	East Renfrewshire	شرق رينفروشاير	U7	71
1169	Newport	نيوبورت	Y6	71
1170	Bath and North East Somerset	باث وشمال شرق سومرست	A4	71
1173	Newham	نيوهام	I8	71
1175	Denbighshire	دنبيشير	X9	71
1176	East Riding of Yorkshire	شرق ركوب يوركشاير	E1	71
1177	Bexley	بيكسلي	A6	71
1178	Bromley	بروملي	B8	71
1179	Bradford	برادفورد	B4	71
1180	Bracknell Forest	غابة براكنيل	B3	71
1181	Cardiff	كارديف	X5	71
1182	Birmingham	برمنغهام	A7	71
1183	Orkney	أوركني	V9	71
1184	East Dunbartonshire	شرق دانبارتونشاير	U5	71
1185	Blackpool	بلاكبول	A9	71
1186	Southampton	ساوثامبتون	M4	71
1187	Newcastle upon Tyne	نيوكاسل أبون تاين	I7	71
1188	Bolton	بولتون	B1	71
1189	Redcar and Cleveland	ريدكار وكليفلاند	K9	71
1190	Bournemouth	بورنموث	B2	71
1191	Swindon	سويندون	N9	71
1192	Stockport	ستوكبورت	N2	71
1193	Windsor and Maidenhead	وندسور ومايدنهيد	P9	71
1194	Inverclyde	إنفركلايد	V4	71
1195	Medway	ميدواي	I3	71
1196	Milton Keynes	ميلتون كينز	I6	71
1197	Dundee City	دندي سيتي	U3	71
1198	Telford and Wrekin	تيلفورد وركين	O2	71
1199	Reading	قراءة	K7	71
1200	Bury	دفن	C1	71
1201	Wolverhampton	ولفرهامبتون	Q3	71
1202	Southwark	ساوثوورك	M8	71
1203	Camden	كامدن	C4	71
1204	Slough	مستنقع	M1	71
1205	Middlesbrough	ميدلسبره	I5	71
1206	Stockton-on-Tees	ستوكتون أون تيز	N3	71
1207	Newtownabbey	نيوتاونبي	T1	71
1208	Lisburn	يسبورن	S5	71
1210	Lewisham	ويشام	H6	71
1211	West Berkshire	غرب بيركشاير	P4	71
1212	Manchester	مانشستر	I2	71
1213	Westminster	وستمنستر	P5	71
1214	Ards	أردز	Q7	71
1215	Plymouth	بليموث	K4	71
1216	Croydon	كرويدون	C8	71
1217	Barking and Dagenham	باركينج وداجنهام	A1	71
1218	Hartlepool	هارتلبول	F5	71
1219	Sheffield	شيفيلد	L9	71
1220	Oldham	أولدهام	K1	71
1221	Knowsley	نوزلي	G9	71
1222	Liverpool	ليفربول	H8	71
1223	Dudley	دادلي	D7	71
1224	Gateshead	غيتسهيد	E5	71
1225	Ealing	إيلينغ	D9	71
1226	Edinburgh	ادنبره	U8	71
1227	Enfield	انفيلد	E3	71
1228	Calderdale	كلدردل	C2	71
1229	Halton	وقف على	E9	71
1230	North Tyneside	شمال تينيسايد	J5	71
1231	Thurrock	ثوروك	O3	71
1232	North East Lincolnshire	شمال شرق لينكولنشاير	J2	71
1233	Wirral	يرل	Q1	71
1234	Hackney	بتذلل	E8	71
1235	Hammersmith and Fulham	هامرسميث وفولهام	F1	71
1236	Havering	هافرينج	F6	71
1237	Harrow	مسلفة	F4	71
1238	Barnet	بارنيت	A2	71
1239	Hounslow	هونسلو	G1	71
1240	Brighton and Hove	برايتون وهوف	B6	71
1241	Kingston upon Hull	كينغستون على هال	G6	71
1242	Redbridge	ريدبريدج	K8	71
1243	Islington	إزلينغتون	G3	71
1244	Kensington and Chelsea	كنسينغتون وتشيلسي	G4	71
1245	Kingston upon Thames	كينغستون أبون تيمز	G7	71
1246	Lambeth	لامبث	H1	71
1247	London	لندن	H9	71
1248	Luton	لوتون	I1	71
1249	Sunderland	سندرلاند	N6	71
1250	Merton	ميرتون	I4	71
1251	Sandwell	ساندويل	L7	71
1252	Salford	سالفورد	L5	71
1253	Peterborough	بيتربورو	K3	71
1254	Poole	بول	K5	71
1255	Tower Hamlets	برج هامليتس	O5	71
1256	Portsmouth	بورتسموث	K6	71
1257	Rochdale	روتشديل	L2	71
1258	Greenwich	غرينتش	E7	71
1259	South Tyneside	جنوب تينيسايد	M7	71
1260	Trafford	ترافورد	O6	71
1261	Sutton	ساتون	N8	71
1262	Torbay	تورباي	O4	71
1263	Richmond upon Thames	ريتشموند على نهر التايمز	L1	71
1264	Hillingdon	هيلينغدون	F9	71
1265	Wakefield	ويكفيلد	O7	71
1266	Waltham Forest	والثام فوريست	O9	71
1267	Wandsworth	اندسوورث	P1	71
1268	Brent	برنت	B5	71
1269	Haringey	هارينجي	F3	71
1270	Saint Andrew	القديس أندرو	01	72
1271	Saint George	القديس جورج	03	72
1272	Saint David	القديس داود	02	72
1273	Saint Patrick	سانت باتريك	06	72
1274	Saint Mark	سان مارك	05	72
1275	Saint John	القديس يوحنا	04	72
1276	Abkhazia	أبخازيا	02	73
1277	Ninotsmindis Raioni	Ninotsmindis Raioni	39	73
1278	P'ot'i	P'ot'i	42	73
1279	Ambrolauris Raioni	Ambrolauris Raioni	09	73
1280	Abashis Raioni	اباشي ريوني	01	73
1281	Akhalts'ikhis Raioni	أخالتسميس ريوني	07	73
1282	Zestap'onis Raioni	زيستابونيس ريوني	62	73
1283	Tsalenjikhis Raioni	تسالينججيريس ريوني	58	73
1284	Marneulis Raioni	مارنوليس رايوني	35	73
1285	Goris Raioni	جوريس رايوني	22	73
1286	K'arelis Raioni	كاريسليز ريوني	25	73
1287	Khashuris Raioni	خاشوريس رايوني	28	73
1288	Kaspis Raioni	كاسبيس رايونى	26	73
1289	Ajaria	أجاريا	04	73
1290	Mts'khet'is Raioni	متخيسيس ريوني	38	73
1291	Ch'okhatauris Raioni	Ch'okhatauris Raioni	16	73
1292	Akhalk'alak'is Raioni	Akhalk'alak'is Raioni	06	73
1293	Samtrediis Raioni	Samtrediis Raioni	48	73
1294	Tqibuli	Tqibuli	56	73
1295	Dushet'is Raioni	Dushet'is Raioni	19	73
1296	Onis Raioni	أونيس رايوني	40	73
1297	Lentekhis Raioni	Lentekhis Raioni	34	73
1298	Martvilis Raioni	مارتفيليز ريوني	36	73
1299	K'ut'aisi	K'ut'aisi	31	73
1300	Akhalgoris Raioni	أخالورجيس رايوني	05	73
1301	Aspindzis Raioni	Aspindzis Raioni	10	73
1302	Akhmetis Raioni	احمدى ريونى	08	73
1303	Lagodekhis Raioni	Lagodekhis Raioni	32	73
1304	Zugdidis Raioni	Zugdidis Raioni	64	73
1305	Borjomis Raioni	بورجوميس رايوني	13	73
1306	T'ianet'is Raioni	T'ianet'is Raioni	55	73
1307	Khobis Raioni	خبيص الريوني	29	73
1308	Kharagaulis Raioni	Kharagaulis Raioni	27	73
1309	Vanis Raioni	فانيس ريوني	61	73
1310	T'elavis Raioni	تيلافيس ريوني	52	73
1311	Tsalkis Raioni	تسالكيس رايوني	59	73
1312	Qazbegis Raioni	قزبيجايز ريوني	43	73
1313	Sagarejos Raioni	ساجاريجوس رايوني	47	73
1314	T'et'ritsqaros Raioni	تيريتسقاروس ريوني	54	73
1315	Dedop'listsqaros Raioni	Dedop'listsqaros Raioni	17	73
1316	Javis Raioni	جافي ريوني	24	73
1317	Ch'khorotsqus Raioni	Ch'khorotsqus Raioni	15	73
1318	Tsqaltubo	Tsqaltubo	60	73
1319	Rust'avi	Rust'avi	45	73
1320	T'bilisi	تبليسي	51	73
1321	Baghdat'is Raioni	بغدايس الريوني	11	73
1322	Lanch'khut'is Raioni	Lanch'khut'is Raioni	33	73
1323	Chiat'ura	Chiat'ura	14	73
1324	Ts'ageris Raioni	Ts'ageris Raioni	57	73
1327	Central	وسط	04	76
1328	Western	الغربي	09	76
1329	Ashanti	أشانتي	02	76
1330	Upper East	الشرق الأوسط	10	76
1331	Volta	فولتا	08	76
1332	Brong-Ahafo	برونغ أهافو	03	76
1333	Northern	شمالي	06	76
1334	Greater Accra	أكبر أكرا	01	76
1335	Upper West	أعالي الغرب	11	76
1336	Eastern	الشرقية	05	76
1338	Vestgronland	Vestgronland	03	78
1339	Nordgronland	Nordgronland	01	78
1340	Ostgronland	Ostgronland	02	78
1341	Central River	سنترال ريفر	03	79
1342	Western	الغربي	05	79
1343	North Bank	الضفة الشمالية	07	79
1344	Upper River	أعالي النهر	04	79
1345	Lower River	نهر سفلي	02	79
1346	Banjul	بانجول	01	79
1347	Kouroussa	كوروسا	19	80
1348	Beyla	بيلا	01	80
1349	Koundara	كوندارا	18	80
1350	Dinguiraye	دنجواياري	07	80
1351	Mali	مالي	22	80
1352	Macenta	ماكنتا	21	80
1355	Kissidougou	كيسيدوغو	17	80
1356	Forecariah	فوريكاريا	10	80
1357	Pita	بيتا	25	80
1361	Dabola	دابولا	05	80
1362	Boke	بوكي	03	80
1363	Mamou	مامو	23	80
1364	Faranah	فاراناه	09	80
1365	Telimele	تليملي	27	80
1366	Boffa	بوفا	02	80
1367	Gueckedou	جوكيدو	13	80
1368	Kindia	كنديا	16	80
1369	Fria	فريا	11	80
1370	Tougue	تواج	28	80
1371	Yomou	يومو	29	80
1372	Gaoual	جاوال	12	80
1373	Kerouane	كيروان	15	80
1374	Dalaba	دالابا	06	80
1375	Conakry	كوناكري	04	80
1376	Coyah	كويا	30	80
1377	Dubreka	دوبريكا	31	80
1378	Kankan	كانكان	32	80
1379	Koubia	كوبيا	33	80
1380	Labe	ابي	34	80
1381	Lelouma	يلوما	35	80
1382	Lola	لولا	36	80
1383	Mandiana	مانديانا	37	80
1384	Nzerekore	نزيريكوري	38	80
1385	Siguiri	سيجويري	39	80
1387	Centro Sur	سنترو سور	06	82
1388	Wele-Nzas	ويلي-نزاس	09	82
1389	Kie-Ntem	كي نتيم	07	82
1390	Litoral	الساحلي	08	82
1391	Annobon	أنوبون	03	82
1392	Bioko Norte	بيوكو نورتي	04	82
1393	Bioko Sur	بيوكو سور	05	82
1395	Kilkis	كيلكيس	06	83
1396	Larisa	لاريسا	21	83
1397	Attiki	أتيكي	35	83
1398	Trikala	تريكالا	22	83
1399	Preveza	بريفيزا	19	83
1400	Kerkira	Kerkira	25	83
1401	Ioannina	وانينا	17	83
1402	Pella	بيلا	07	83
1403	Thessaloniki	سالونيك	13	83
1404	Voiotia	Voiotia	33	83
1405	Kikladhes	Kikladhes	49	83
1406	Kavala	كافالا	14	83
1407	Argolis	أرغوليس	36	83
1408	Rethimni	Rethimni	44	83
1409	Serrai	سيراي	05	83
1410	Lakonia	اكونيا	42	83
1411	Iraklion	ايراكليون	45	83
1412	Lasithi	اسيتي	46	83
1413	Rodhopi	Rodhopi	02	83
1414	Drama	دراما	04	83
1415	Messinia	ميسينيا	40	83
1416	Evvoia	إيفويا	34	83
1417	Akhaia	Akhaia	38	83
1418	Magnisia	ماغنيزيا	24	83
1419	Khania	خانيا	43	83
1420	Kardhitsa	Kardhitsa	23	83
1421	Evros	إفروس	01	83
1422	Arkadhia	Arkadhia	41	83
1423	Aitolia kai Akarnania	أيتوليا كاي Akarnania	31	83
1424	Kozani	كوزاني	11	83
1425	Thesprotia	ثريبروتيا	18	83
1426	Lesvos	يسفوس	51	83
1427	Dhodhekanisos	Dhodhekanisos	47	83
1428	Kefallinia	كيفالونيا	27	83
1429	Khios	Khios	50	83
1430	Arta	أرتا	20	83
1431	Grevena	غريفينا	10	83
1432	Zakinthos	زاكينثوس	28	83
1433	Evritania	Evritania	30	83
1434	Fthiotis	فثيوتيس	29	83
1435	Kastoria	كاستوريا	09	83
1436	Samos	ساموس	48	83
1437	Imathia	إيماثيا	12	83
1438	Florina	فلورينا	08	83
1439	Pieria	بييريا	16	83
1440	Levkas	Levkas	26	83
1441	Fokis	فوكيس	32	83
1442	Ilia	إليا	39	83
1443	Korinthia	كورينثيا	37	83
1444	Xanthi	كسانتي	03	83
1445	Khalkidhiki	Khalkidhiki	15	83
1448	Izabal	ايزابال	09	85
1449	Alta Verapaz	ألتا فيراباس	01	85
1450	Retalhuleu	ريتالهوليو	15	85
1451	El Progreso	البروغريسو	05	85
1452	Guatemala	غواتيمالا	07	85
1453	Jutiapa	جوتيابا	11	85
1454	Chimaltenango	تشيمالتنانغو	03	85
1455	Chiquimula	شيكيمولا	04	85
1456	Zacapa	زاكابا	22	85
1457	Jalapa	جالابا	10	85
1458	San Marcos	سان ماركوس	17	85
1459	Quiche	كيشي	14	85
1460	Huehuetenango	هوهوتنانغو	08	85
1461	Quetzaltenango	كويتزالتنانغو	13	85
1462	Baja Verapaz	باجا فيراباز	02	85
1463	Santa Rosa	سانتا روزا	18	85
1464	Solola	سولولا	19	85
1465	Peten	بيتين	12	85
1466	Escuintla	ايسكوينتلا	06	85
1467	Sacatepequez	سكاتيبيكيز	16	85
1468	Totonicapan	توتونيكابان	21	85
1469	Suchitepequez	سوشيتبيكيز	20	85
1470	Cacheu	كاشيو	06	86
1471	Biombo	بومبو	12	86
1472	Oio	أويو	04	86
1473	Bissau	بيساو	11	86
1474	Bafata	بافاتا	01	86
1475	Tombali	تومبالي	07	86
1476	Gabu	غابو	10	86
1477	Bolama	بولاما	05	86
1478	Quinara	كينارا	02	86
1479	Mahaica-Berbice	ماهايكا بيبريس	15	87
1480	Upper Takutu-Upper Essequibo	Upper Takutu-Upper Essequibo	19	87
1481	Barima-Waini	باريما وايني	10	87
1482	Pomeroon-Supenaam	بومرون سوبينام	16	87
1483	Demerara-Mahaica	ديميرارا ماهايكا	12	87
1484	Cuyuni-Mazaruni	جويوني مزروني	11	87
1485	East Berbice-Corentyne	شرق بيربيس-كورنتي	13	87
1486	Essequibo Islands-West Demerara	Essequibo Islands-West Demerara	14	87
1487	Potaro-Siparuni	بوتارو سيباروني	17	87
1488	Upper Demerara-Berbice	Upper Demerara-Berbice	18	87
1490	Colon	القولون	03	89
1491	Choluteca	تشولوتيكا	02	89
1492	Comayagua	كوماياغوا	04	89
1493	Valle	فالي	17	89
1494	Santa Barbara	سانتا باربارا	16	89
1495	Francisco Morazan	فرانسيسكو مورازان	08	89
1496	El Paraiso	الباريسو	07	89
1497	Lempira	هندوراسي	13	89
1498	Copan	كوبان	05	89
1499	Olancho	اولانجو	15	89
1500	Cortes	كورتيس	06	89
1501	Yoro	يورو	18	89
1502	Atlantida	أتلانتيدا	01	89
1503	Intibuca	Intibuca	10	89
1504	La Paz	لاباز	12	89
1505	Ocotepeque	أوكوتبيك	14	89
1506	Gracias a Dios	جراسياس ديوس	09	89
1507	Islas de la Bahia	ايسلاس دي لا باهيا	11	89
1508	Primorsko-Goranska	بريمورسكو غورانسكا	12	90
1509	Splitsko-Dalmatinska	سبليتسكو دالماتينسكا	15	90
1510	Istarska	Istarska	04	90
1511	Osjecko-Baranjska	أوسيجيكو	10	90
1512	Viroviticko-Podravska	فيروفيتيكو-بودرافسكا	17	90
1513	Grad Zagreb	غراد زغرب	21	90
1514	Sisacko-Moslavacka	سيساكو موسلافاكا	14	90
1515	Licko-Senjska	ليكو سنجسكا	08	90
1516	Brodsko-Posavska	برودسكو بوسافسكا	02	90
1517	Dubrovacko-Neretvanska	دوبروفنيك نيريتفا	03	90
1518	Pozesko-Slavonska	بوزيسكو-سلافونسكا	11	90
1519	Zagrebacka	زاجريباكا	20	90
1520	Bjelovarsko-Bilogorska	بجيلوفارسكو بيلوجوورسكا	01	90
1521	Varazdinska	فارازدينسكا	16	90
1522	Vukovarsko-Srijemska	فوكوفارسكو سريمسكا	18	90
1523	Krapinsko-Zagorska	كاربينسكو زاجورسكا	07	90
1524	Koprivnicko-Krizevacka	كوبرفنيكو كريزفاكا	06	90
1525	Karlovacka	كارلوفاكا	05	90
1526	Sibensko-Kninska	سيبينسكو كنينسكا	13	90
1527	Medimurska	ميديمرسكا	09	90
1529	Sud	سود	12	91
1530	Centre	مركز	07	91
1532	Ouest	كويست	11	91
1533	Nord	نورد	09	91
1534	Nord-Ouest	الإقليم الشمالي الغربي	03	91
1535	Nord-Est	الشمال الشرقي	10	91
1536	Sud-Est	الجنوب الشرقي	13	91
1537	Artibonite	أرتيبونيت	06	91
1538	Komarom-Esztergom	كومارم إسترجم	12	92
1539	Fejer	فيجر	08	92
1540	Jasz-Nagykun-Szolnok	جاز ناجيكن سزولنوك	20	92
1541	Baranya	بارانيا	02	92
1542	Szabolcs-Szatmar-Bereg	سزابولكس زاتمار بيريج	18	92
1543	Heves	هيفيز	11	92
1544	Borsod-Abauj-Zemplen	بورسود أباوج زمبلين	04	92
1545	Gyor-Moson-Sopron	جيور موسون سوبرون	09	92
1546	Pest	الآفات	16	92
1547	Veszprem	فيزبرم	23	92
1548	Bacs-Kiskun	البكالوريا كيسكون	01	92
1549	Vas	خدمات القيمة المضافة	22	92
1550	Hajdu-Bihar	هاجدو بيهار	10	92
1551	Zala	زالة	24	92
1552	Somogy	سوموغي	17	92
1553	Tolna	تولنا	21	92
1554	Nograd	نوجراد	14	92
1555	Budapest	بودابست	05	92
1556	Miskolc	ميشكولتس	13	92
1557	Csongrad	كسونجراد	06	92
1558	Debrecen	ديبريسين	07	92
1559	Bekes	بيكيس	03	92
1560	Szeged	سيجد	19	92
1561	Pecs	بيكس	15	92
1562	Gyor	جيور	25	92
1563	Jawa Timur	جاوا تيمور	08	93
1565	Sulawesi Tenggara	سولاويزي تينجارا	22	93
1567	Nusa Tenggara Timur	نوسا تينجارا تيمور	18	93
1568	Sulawesi Utara	سولاويسي اوتارا	31	93
1569	Sumatera Barat	سومطرة بارات	24	93
1570	Aceh	اتشيه	01	93
1571	Sulawesi Tengah	سولاويزي تنجاه	21	93
1575	Jawa Tengah	جاوا تينغاه	07	93
1576	Jawa Barat	جاوا بارات	30	93
1577	Bali	بالي	02	93
1579	Banten	بانتين	33	93
1580	Sumatera Utara	سومطرة اوتارا	26	93
1581	Kalimantan Timur	كاليمانتان تيمور	14	93
1582	Lampung	لامبونج	15	93
1583	Nusa Tenggara Barat	نوسا تينجارا بارات	17	93
1584	Kalimantan Barat	كاليمانتان بارات	11	93
1585	Kalimantan Tengah	كاليمنتان Tengah	13	93
1587	Bengkulu	بنجكولو	03	93
1588	Jambi	جامبي	05	93
1589	Kalimantan Selatan	كاليمانتان سيلاتان	12	93
1590	Yogyakarta	يوجياكرتا	10	93
1591	Jakarta Raya	جاكرتا رايا	04	93
1593	Maluku	مالوكو	28	93
1594	Galway	غالواي	10	94
1595	Cork	فلين	04	94
1596	Kerry	كيري	11	94
1597	Limerick	اللمريكية قصيدة خماسية فكاهية	16	94
1598	Longford	لونجفورد	18	94
1599	Laois	اويس	15	94
1600	Waterford	وترفورد	27	94
1601	Mayo	مايو	20	94
1602	Sligo	سليغو	25	94
1603	Kildare	كيلدير	12	94
1604	Dublin	دبلن	07	94
1605	Wicklow	ويكلو	31	94
1606	Cavan	كافان	02	94
1607	Kilkenny	كيلكيني	13	94
1608	Wexford	ويكسفورد	30	94
1609	Carlow	كارلو	01	94
1610	Offaly	أوفالي	23	94
1611	Monaghan	موناغان	22	94
1612	Leitrim	يتريم	14	94
1613	Clare	كلير	03	94
1614	Donegal	دونيجال	06	94
1615	Louth	لاوث	19	94
1616	Roscommon	روسكومون	24	94
1617	Tipperary	تيبيراري	26	94
1618	Westmeath	ستميث	29	94
1619	Meath	ميث	21	94
1627	West Bengal	ولاية البنغال الغربية	28	96
1628	Uttar Pradesh	أوتار براديش	36	96
1629	Punjab	البنجاب	23	96
1630	Madhya Pradesh	ماديا براديش	35	96
1631	Karnataka	كارناتاكا	19	96
1632	Maharashtra	ماهاراشترا	16	96
1633	Haryana	هاريانا	10	96
1634	Uttarakhand	أوتارانتشال	39	96
1635	Andhra Pradesh	ولاية اندرا براديش	02	96
1636	Tripura	تريبورا	26	96
1637	Tamil Nadu	تاميل نادو	25	96
1638	Jammu and Kashmir	جامو وكشمير	12	96
1639	Andaman and Nicobar Islands	جزر أندامان ونيكوبار	01	96
1640	Assam	أسام	03	96
1641	Chhattisgarh	تشهاتيسجاره	37	96
1642	Rajasthan	راجستان	24	96
1643	Goa	غوا	33	96
1644	Puducherry	بودوتشيري	22	96
1645	Gujarat	غوجارات	09	96
1646	Kerala	ولاية كيرالا	13	96
1647	Arunachal Pradesh	اروناتشال براديش	30	96
1648	Orissa	أوريسا	21	96
1649	Himachal Pradesh	هيماشال براديش	11	96
1650	Bihar	بيهار	34	96
1651	Meghalaya	ميغالايا	18	96
1652	Nagaland	ناجالاند	20	96
1653	Manipur	مانيبور	17	96
1654	Mizoram	ميزورام	31	96
1655	Jharkhand	جهارخاند	38	96
1657	Delhi	دلهي	07	96
1658	Dadra and Nagar Haveli	دادرا وناغار هافيلي	06	96
1660	Daman and Diu	دامان وديو	32	96
1661	Sikkim	سيكيم	29	96
1662	Chandigarh	شانديغار	05	96
1663	Lakshadweep	اكشادويب	14	96
1664	As Sulaymaniyah	السليمانية	05	97
1665	Dhi Qar	ذي قار	09	97
1666	Maysan	ميسان	14	97
1667	Diyala	ديالى	10	97
1668	Baghdad	بغداد	07	97
1669	Wasit	أكانت	16	97
1670	Salah ad Din	صلاح الدين	18	97
1671	Al Qadisiyah	القادسية	04	97
1672	Babil	بابل	06	97
1673	Karbala'	كربلاء	12	97
1674	An Najaf	النجف	17	97
1675	Al Muthanna	المثنى	03	97
1676	Al Anbar	الانبار	01	97
1677	Dahuk	دهوك	08	97
1678	Ninawa	نينوى	15	97
1679	Arbil	اربيل	11	97
1680	Al Basrah	البصرة	02	97
1681	At Ta'mim	في التميم	13	97
1682	Zanjan	زنجان	27	98
1683	Azarbayjan-e Bakhtari	أزربايجان بختاري	01	98
1684	Yazd	يزد	31	98
1685	Khuzestan	خوزستان	15	98
1686	Esfahan	أصفهان	28	98
1687	Ardabil	أردبيل	32	98
1688	Tehran	طهران	26	98
1689	East Azarbaijan	شرق ازربايجان	33	98
1690	Bushehr	بوشهر	22	98
1691	Hormozgan	هرمزكان	11	98
1692	Mazandaran	مازندران	17	98
1693	Kerman	كرمان	29	98
1694	Fars	فارس	07	98
1695	Kohkiluyeh va Buyer Ahmadi	Kohkiluyeh va Buyer Ahmadi	05	98
1696	Khorasan	خراسان	30	98
1697	Sistan va Baluchestan	سيستان وبلوتشستان	04	98
1698	Chahar Mahall va Bakhtiari	Chahar Mahall va Bakhtiari	03	98
1699	Kerman	كرمان	12	98
1700	Mazandaran	مازندران	35	98
1701	Qazvin	قزوين	38	98
1702	Zanjan	زنجان	36	98
1703	Markazi	المركزي	24	98
1704	Markazi	المركزي	19	98
1705	Lorestan	ورستان	23	98
1706	Markazi	المركزي	34	98
1707	Khorasan-e Razavi	خراسان رضوي	42	98
1708	Hamadan	همدان	09	98
1709	Semnan	سمنان	25	98
1710	Gilan	جيلان	08	98
1711	Kordestan	كردستان	16	98
1712	Bakhtaran	Bakhtaran	13	98
1713	Ilam	إيلام	10	98
1714	Semnan Province	مقاطعة سمنان	18	98
1715	Golestan	كلستان	37	98
1716	Qom	قم	39	98
1718	Zanjan	زنجان	21	98
1720	Skagafjardarsysla	Skagafjardarsysla	28	99
1721	Borgarfjardarsysla	Borgarfjardarsysla	07	99
1722	Myrasysla	Myrasysla	17	99
1723	Rangarvallasysla	Rangarvallasysla	23	99
1724	Eyjafjardarsysla	Eyjafjardarsysla	09	99
1725	Kjosarsysla	Kjosarsysla	15	99
1726	Vestur-Isafjardarsysla	Vestur-Isafjardarsysla	36	99
1728	Strandasysla	Strandasysla	30	99
1729	Gullbringusysla	Gullbringusysla	10	99
1730	Austur-Hunavatnssysla	Austur-Hunavatnssysla	05	99
1731	Austur-Skaftafellssysla	Austur-Skaftafellssysla	06	99
1732	Nordur-Mulasysla	Nordur-Mulasysla	20	99
1733	Sudur-Mulasysla	Sudur-Mulasysla	31	99
1734	Vestur-Bardastrandarsysla	Vestur-Bardastrandarsysla	34	99
1735	Snafellsnes- og Hnappadalssysla	Snafellsnes- og Hnappadalssysla	29	99
1736	Arnessysla	Arnessysla	03	99
1737	Vestur-Hunavatnssysla	Vestur-Hunavatnssysla	35	99
1738	Sudur-Tingeyjarsysla	Sudur-Tingeyjarsysla	32	99
1740	Vestur-Skaftafellssysla	Vestur-Skaftafellssysla	37	99
1742	Nordur-Tingeyjarsysla	Nordur-Tingeyjarsysla	21	99
1743	Toscana	توسكانا	16	100
1744	Veneto	فينيتو	20	100
1745	Campania	كامبانيا	04	100
1746	Marche	مارتش	10	100
1747	Piemonte	بيمونتي	12	100
1748	Lombardia	لومبارديا	09	100
1749	Sardegna	ساردينيا	14	100
1750	Abruzzi	أبروتسو	01	100
1751	Emilia-Romagna	إيميليا-رومانيا	05	100
1752	Trentino-Alto Adige	ترينتينو ألتو أديجي	17	100
1753	Umbria	أومبريا	18	100
1754	Basilicata	باسيليكاتا	02	100
1755	Puglia	بوليا	13	100
1756	Sicilia	صقلية	15	100
1757	Lazio	لاتسيو	07	100
1758	Liguria	ليغوريا	08	100
1759	Calabria	كالابريا	03	100
1760	Molise	موليز	11	100
1761	Friuli-Venezia Giulia	فريولي فينيتسيا جوليا	06	100
1762	Valle d'Aosta	فالي أوستا	19	100
1764	Saint Ann	سانت آن	09	101
1765	Saint Elizabeth	سانت إليزابيث	11	101
1766	Hanover	هانوفر	02	101
1767	Westmoreland	يستمورلاند	16	101
1768	Trelawny	تريلاوني	15	101
1769	Manchester	مانشستر	04	101
1770	Saint James	جيمس قديس	12	101
1771	Saint Andrew	القديس أندرو	08	101
1772	Saint Thomas	سانت توماس	14	101
1773	Saint Mary	القديس ماري	13	101
1774	Portland	بورتلاند	07	101
1775	Clarendon	كلارندون	01	101
1776	Saint Catherine	سانت كاترين	10	101
1777	Kingston	كينغستون	17	101
1779	At Tafilah	في الطفيلة	12	102
1782	Al Karak	الكرك	09	102
1784	Al Balqa'	البلقاء	02	102
1786	Amman	عمان	16	102
1787	Al Aqabah	العقبة	21	102
1788	Okinawa	أوكيناوا	47	103
1789	Nagasaki	ناغازاكي	27	103
1790	Hokkaido	هوكايدو	12	103
1791	Tokushima	توكوشيما	39	103
1792	Mie	مي	23	103
1793	Kanagawa	كاناغاوا	19	103
1794	Chiba	شيبا	04	103
1795	Hyogo	هيوغو	13	103
1796	Yamaguchi	ياماغوتشي	45	103
1797	Aomori	أوموري	03	103
1798	Miyazaki	ميازاكي	25	103
1799	Shizuoka	شيزوكا	37	103
1800	Shimane	شيمان	36	103
1801	Fukushima	فوكوشيما	08	103
1802	Okayama	أوكاياما	31	103
1803	Shiga	شيجا	35	103
1804	Kagoshima	كاجوشيما	18	103
1805	Hiroshima	هيروشيما	11	103
1806	Tottori	توتوري	41	103
1807	Akita	اكيتا	02	103
1808	Nagano	ناغانو	26	103
1809	Fukui	فوكوي	06	103
1810	Saitama	سايتاما	34	103
1811	Wakayama	واكاياما	43	103
1812	Kochi	كوتشي	20	103
1813	Iwate	ايواتي	16	103
1814	Miyagi	مياجي	24	103
1815	Niigata	نيجاتا	29	103
1816	Gumma	صمغة	10	103
1817	Aichi	أيشي	01	103
1818	Toyama	توياما	42	103
1819	Kumamoto	كوماموتو	21	103
1820	Kagawa	كاغاوا	17	103
1821	Ehime	ايمى	05	103
1822	Tokyo	طوكيو	40	103
1823	Fukuoka	فوكوكا	07	103
1824	Tochigi	توتشيغي	38	103
1825	Yamagata	ياماغاتا	44	103
1826	Saga	قصة طويلة	33	103
1827	Oita	أويتا	30	103
1828	Gifu	جيفو	09	103
1829	Ishikawa	إيشيكاوا	15	103
1830	Nara	نارا	28	103
1831	Ibaraki	ايباراكي	14	103
1832	Kyoto	كيوتو	22	103
1833	Yamanashi	ياماناشي	46	103
1834	Osaka	أوساكا	32	103
1835	Coast	ساحل	02	104
1836	Nyanza	نيانزا	07	104
1837	Rift Valley	الوادي المتصدع	08	104
1838	Western	الغربي	09	104
1839	North-Eastern	شمال شرق	06	104
1840	Eastern	الشرقية	03	104
1841	Nairobi Area	منطقة نيروبي	05	104
1842	Central	وسط	01	104
1843	Jalal-Abad	جلال آباد	03	105
1844	Naryn	نارين	04	105
1845	Osh	أوش	05	105
1846	Chuy	تشوي	02	105
1847	Ysyk-Kol	يسيك-كول	07	105
1848	Bishkek	بيشكيك	01	105
1849	Talas	تالاس	06	105
1850	Batken	باتكن	09	105
1852	Siem Reap	سيم ريب	16	106
1853	Kracheh	كراتي	09	106
1854	Kampong Thum	كامبونغ ثوم	05	106
1855	Kampong Chhnang	كامبونج شنانج	03	106
1857	Kampong Cham	كامبونج تشام	02	106
1858	Kampong Speu	كامبونج سبيو	04	106
1859	Takeo	اتخاذ س	19	106
1860	Batdambang	باتامبانغ	01	106
1861	Prey Veng	بريى فنج	14	106
1862	Ratanakiri Kiri	راتاناكيري كيري	15	106
1863	Svay Rieng	سفاي رينج	18	106
1864	Koh Kong	كوه كونغ	08	106
1865	Pursat	بورسات	12	106
1866	Phnum Penh	بنوم بنه	11	106
1867	Mondulkiri	موندولكيري	10	106
1868	Stung Treng	ستونغ ترينغ	17	106
1869	Kampot	كامبوت	06	106
1870	Banteay Meanchey	بانتي ميانشي	25	106
1871	Preah Vihear	برياه فيهيار	13	106
1872	Kandal	كاندال	07	106
1874	Anjouan	أنجوان	01	108
1875	Moheli	موهيلي	03	108
1876	Grande Comore	القمر الكبرى	02	108
1877	Saint George Gingerland	سانت جورج جينجيرلاند	04	109
1878	Saint James Windward	سانت جيمس ويندوارد	05	109
1879	Saint Thomas Lowland	سانت توماس لوولاند	12	109
1880	Saint George Basseterre	سانت جورج باسيتير	03	109
1881	Saint John Figtree	القديس يوحنا فيجترى	07	109
1882	Saint Peter Basseterre	القديس بطرس باستير	11	109
1883	Saint John Capisterre	القديس يوحنا كابيستر	06	109
1884	Christ Church Nichola Town	كنيسة المسيح نيقولا تاون	01	109
1885	Trinity Palmetto Point	الثالوث بالميتو بوينت	15	109
1886	Saint Anne Sandy Point	سانت آن ساندي بوينت	02	109
1887	Saint Mary Cayon	سانت ماري كايون	08	109
1888	Saint Thomas Middle Island	جزيرة سانت توماس الوسطى	13	109
1889	Saint Paul Capisterre	سانت بول كابيستر	09	109
1890	P'yongan-namdo	P'yongan-نامدو	15	110
1891	P'yongan-bukto	P'yongan-bukto	11	110
1892	P'yongyang-si	P'yongyang-سي	12	110
1893	Kangwon-do	كانج وون دو	09	110
1894	Hwanghae-bukto	هوانغهاي-bukto	07	110
1895	Hamgyong-namdo	هامكيونغ-نامدو	03	110
1896	Chagang-do	تشاغانغ دو	01	110
1897	Hamgyong-bukto	هامكيونغ-bukto	17	110
1898	Hwanghae-namdo	هوانغهاي-نامدو	06	110
1899	Namp'o-si	Namp'o-سي	14	110
1900	Kaesong-si	كايسونج، الاشتراكية	08	110
1901	Yanggang-do	يانجانج دو	13	110
1902	Najin Sonbong-si	ناجين سونبونج سي	18	110
1903	Ch'ungch'ong-bukto	Ch'ungch'ong-bukto	05	111
1904	Kangwon-do	كانج وون دو	06	111
1905	Ch'ungch'ong-namdo	Ch'ungch'ong-نامدو	17	111
1906	Kyongsang-bukto	كيونجسانج-bukto	14	111
1907	Cholla-namdo	تشولا-نامدو	16	111
1908	Kyonggi-do	كيونجي دو	13	111
1909	Cheju-do	تشيجو دو	01	111
1910	Cholla-bukto	تشولا-bukto	03	111
1911	Seoul-t'ukpyolsi	سول-t'ukpyolsi	11	111
1912	Kyongsang-namdo	كيونجسانج-نامدو	20	111
1913	Taegu-jikhalsi	تايجو-jikhalsi	15	111
1914	Pusan-jikhalsi	بوسان-jikhalsi	10	111
1915	Kwangju-jikhalsi	كوانجو-jikhalsi	18	111
1916	Ulsan-gwangyoksi	أولسان-gwangyoksi	21	111
1917	Inch'on-jikhalsi	إنشون-jikhalsi	12	111
1918	Taejon-jikhalsi	تايجون-jikhalsi	19	111
1919	Al Kuwayt	الكوييت	02	112
1920	Al Jahra	الجهراء	05	112
1923	Almaty	ألماتي	01	114
1924	South Kazakhstan	جنوب كازاخستان	10	114
1925	North Kazakhstan	شمال كازاخستان	16	114
1926	Pavlodar	بافلودار	11	114
1927	Qaraghandy	كاراجهاندي	12	114
1928	Qyzylorda	كيزيلورودا	14	114
1929	East Kazakhstan	شرق كازاخستان	15	114
1930	Aqmola	أكمولا	03	114
1931	Aqtobe	أكتوب	04	114
1932	Qostanay	كوستاناي	13	114
1933	West Kazakhstan	غرب كازاخستان	07	114
1934	Atyrau	أتيراو	06	114
1935	Zhambyl	Zhambyl	17	114
1936	Astana	أستانا	05	114
1937	Mangghystau	مانجهيستاو	09	114
1938	Almaty City	مدينة ألماتي	02	114
1939	Bayqonyr	Bayqonyr	08	114
1941	Savannakhet	سافاناخيت	10	115
1942	Phongsali	فونغسالي	08	115
1943	Saravan	سروان	09	115
1946	Houaphan	هوافان	03	115
1947	Attapu	أتابو	01	115
1949	Champasak	تشامباساك	02	115
1950	Louangphrabang	وانجفرابانج	17	115
1951	Oudomxai	أودومكساي	07	115
1955	Xiangkhoang	زيانجكوانج	14	115
1956	Vientiane	فينتيان	11	115
1960	Xaignabouri	Xaignabouri	13	115
1961	Khammouan	خاموان	04	115
1966	Liban-Nord	شمال لبنان	03	116
1967	Al Janub	الجنوب	02	116
1968	Beyrouth	بيروت	04	116
1969	Mont-Liban	جبل لبنان	05	116
1970	Beqaa	البقاع	01	116
1971	Liban-Sud	لبنان-سود	06	116
1972	Micoud	ميكو	08	117
1973	Laborie	لابوري	07	117
1974	Dennery	دينيري	05	117
1975	Anse-la-Raye	آنس-لا-راي	01	117
1976	Vieux-Fort	فيو فورت	10	117
1977	Castries	كاستري	03	117
1978	Soufriere	سوفرير	09	117
1979	Gros-Islet	جروس-جزيرة	06	117
1980	Choiseul	تشويسيول	04	117
1981	Dauphin	الدوفين الابن البكر لملك فرنسي	02	117
1982	Praslin	براسلين	11	117
1983	Balzers	بلزرس	01	118
1984	Gamprin	جمبرين	03	118
1985	Planken	بلانكن	05	118
1986	Vaduz	فادوز	11	118
1987	Eschen	اشن	02	118
1988	Triesenberg	تريسنبرغ	10	118
1989	Schellenberg	شلينبرغ	08	118
1990	Mauren	مورن	04	118
1991	Ruggell	روجل	06	118
1992	Schaan	ستشان	07	118
1993	Triesen	تريزين	09	118
1994	North Western	الشمال الغربي	32	119
1995	Southern	جنوبي	34	119
1996	Central	وسط	29	119
1997	Sabaragamuwa	ساباراغاموا	33	119
1998	North Central	شمال وسط	30	119
2000	Western	الغربي	36	119
2001	Uva	أوفا	35	119
2002	Nimba	نيمبا	09	120
2003	Grand Bassa	غراند باسا	11	120
2004	Lofa	وفا	05	120
2005	Bong	بونغ	01	120
2007	Montserrado	مونتسيرادو	14	120
2009	Margibi	مارغيبي	17	120
2011	Sino	الصينية	10	120
2012	River Cess	نهر سيس	18	120
2013	Grand Cape Mount	غراند كيب ماونت	12	120
2015	Maryland	ماريلاند	13	120
2016	Grand Cape Mount	غراند كيب ماونت	04	120
2017	Gbarpolu	غباربولو	21	120
2018	River Gee	نهر جي	22	120
2019	Grand Gedeh	جراند جيده	19	120
2020	Lofa	وفا	20	120
2021	Maseru	ماسيرو	14	121
2022	Quthing	كوثينج	18	121
2023	Mafeteng	مافتينج	13	121
2024	Berea	بيريا	10	121
2025	Mohales Hoek	موهاليس هوك	15	121
2026	Thaba-Tseka	تابا تسيكا	19	121
2027	Butha-Buthe	بوثا بوثي	11	121
2028	Leribe	يرايب	12	121
2029	Qachas Nek	كاشاس نيك	17	121
2030	Mokhotlong	موكوتلونج	16	121
2032	Panevezio Apskritis	بانيفزيو ابسكريتيس	60	122
2033	Telsiu Apskritis	Telsiu Apskritis	63	122
2034	Klaipedos Apskritis	Klaipedos Apskritis	58	122
2035	Vilniaus Apskritis	Vilniaus Apskritis	65	122
2036	Siauliu Apskritis	Siauliu Apskritis	61	122
2037	Taurages Apskritis	Taurages Apskritis	62	122
2038	Marijampoles Apskritis	Marijampoles Apskritis	59	122
2040	Utenos Apskritis	Utenos Apskritis	64	122
2041	Alytaus Apskritis	عليتاوس ابسكريتيس	56	122
2042	Kauno Apskritis	كاونو ابسكريتيس	57	122
2043	Luxembourg	لوكسمبورغ	03	123
2044	Grevenmacher	Grevenmacher	02	123
2045	Diekirch	Diekirch	01	123
2046	Madonas	مادوناس	20	124
2047	Kuldigas	كلديجاس	15	124
2048	Daugavpils	داوجافبيلس	07	124
2049	Tukuma	تكما	29	124
2050	Ventspils	فنتسبيلز	33	124
2051	Dobeles	دوبيليز	08	124
2052	Liepajas	ليباجاس	17	124
2053	Balvu	بالفو	03	124
2054	Saldus	سالدوس	27	124
2055	Bauskas	باوسكا	04	124
2056	Limbazu	يمبازو	18	124
2057	Ludzas	لدزاس	19	124
2058	Cesu	سيسو	05	124
2059	Jekabpils	يكاب	10	124
2060	Aluksnes	ألكسنيز	02	124
2061	Rezeknes	ريزكنس	24	124
2062	Rigas	ريغاس	26	124
2063	Ogres	الغيلان	21	124
2064	Kraslavas	كراسلافاس	14	124
2065	Gulbenes	جلبينيز	09	124
2066	Riga	ريغا	25	124
2067	Preilu	بريلي	22	124
2068	Aizkraukles	أيزكروكليز	01	124
2069	Talsu	تالسو	28	124
2070	Jelgavas	جيلجافاس	12	124
2071	Valkas	فالكاس	30	124
2072	Valmieras	فالميراس	31	124
2073	Liepaja	يابايا	16	124
2074	Ventspils	فنتسبيلز	32	124
2075	Daugavpils	داوجافبيلس	06	124
2076	Rezekne	ريزكن	23	124
2077	Yafran	يفرن	62	125
2078	Tarabulus	طرابلس	61	125
2079	An Nuqat al Khams	أحد فنادق الخمس	51	125
2080	Al Aziziyah	العزيزية	03	125
2081	Az Zawiyah	الزاوية	53	125
2082	Misratah	مصراتة	58	125
2083	Gharyan	غريان	57	125
2084	Tubruq	طبرق	42	125
2085	Tarhunah	ترهونة	41	125
2087	Ash Shati'	الشطي	13	125
2088	Ajdabiya	اجدابيا	47	125
2089	Murzuq	مرزق	30	125
2090	Al Jabal al Akhdar	الجبل الاخضر	49	125
2093	Ghadamis	غدامس	56	125
2096	Awbari	Awbari	52	125
2097	Al Khums	الخمص	50	125
2099	Al Kufrah	الكفرة	08	125
2102	Al Fatih	الفاتح	48	125
2103	Banghazi	بنغازي	54	125
2104	Zlitan	زليتن	45	125
2105	Al Jufrah	الجفرة	05	125
2108	Sawfajjin	Sawfajjin	59	125
2110	Darnah	درنة	55	125
2111	Sabha	سبها	34	125
2116	Surt	سرت	60	125
2166	Gagauzia	جاجوزيا	51	128
2175	Antananarivo	أنتاناناريفو	05	129
2176	Mahajanga	ماهاجانغا	03	129
2177	Toliara	توليارا	06	129
2178	Fianarantsoa	فيانارانتسوا	02	129
2179	Antsiranana	أنتسيرانانا	01	129
2180	Toamasina	تواماسينا	04	129
2182	Petrovec	بيتروفيتش	79	131
2183	Bogovinje	بوجوفينيه	10	131
2184	Lozovo	وزوفو	60	131
2185	Rostusa	Rostusa	88	131
2186	Staro Nagoricane	ستارو ناجوريكان	97	131
2187	Gevgelija	غيفيغليا	33	131
2188	Srbinovo	Srbinovo	94	131
2189	Orasac	أوراساك	75	131
2190	Valandovo	فالاندوفو	A8	131
2191	Ilinden	إيلندين	36	131
2192	Ohrid	أوهريد	74	131
2193	Sveti Nikole	سفيتي نيكول	A4	131
2194	Lipkovo	يبكوفو	59	131
2195	Zitose	زيتوسي	C4	131
2196	Studenicani	ستدينيكاني	A2	131
2197	Krivogastani	كريفوغاستاني	53	131
2198	Radovis	رادوفيس	84	131
2199	Dobrusevo	Dobrusevo	26	131
2200	Rankovce	رانكوفس	85	131
2201	Topolcani	Topolcani	A7	131
2202	Kriva Palanka	كريفا بالانكا	52	131
2203	Zajas	زاجاس	C1	131
2204	Vitoliste	فيتوليستي	B5	131
2205	Debar	حرم	21	131
2206	Bosilovo	بوزيلوفو	11	131
2207	Dzepciste	Dzepciste	31	131
2208	Vasilevo	فاسيليفو	A9	131
2209	Star Dojran	ستار دوجران	96	131
2210	Saraj	السراج	90	131
2211	Aracinovo	آراسينوفو	01	131
2212	Oslomej	أوسلوميج	77	131
2213	Miravci	Miravci	66	131
2214	Belcista	بيلسيستا	03	131
2215	Karbinci	كاربينكي	40	131
2216	Krusevo	كروسيفو	54	131
2217	Kondovo	Kondovo	48	131
2218	Resen	رسن	86	131
2219	Lukovo	Lukovo	61	131
2220	Vranestica	فرانيستيكا	B6	131
2221	Negotino-Polosko	نيغوتينو-Polosko	70	131
2222	Stip	ستيب	98	131
2223	Sopotnica	Sopotnica	93	131
2224	Orizari	أوريزاري	76	131
2225	Veles	فيليس	B1	131
2226	Bac	البكالوريا	02	131
2227	Zelenikovo	زيلينيكوفو	C2	131
2228	Novo Selo	نوفو سيلو	72	131
2229	Strumica	ستروميكا	A1	131
2230	Mavrovi Anovi	مافروفي أنوفي	64	131
2231	Novaci	نوفا سي	71	131
2232	Gostivar	غوستيفار	34	131
2233	Cucer-Sandevo	كسير-سانديفو	20	131
2234	Demir Kapija	ديمير كابيجا	25	131
2235	Oblesevo	أولسيفو	73	131
2236	Caska	كاسكا	15	131
2237	Murtino	Murtino	68	131
2238	Demir Hisar	دمير حصار	24	131
2239	Probistip	Probistip	83	131
2240	Makedonski Brod	Makedonski برود	63	131
2241	Karpos	كاربوس	41	131
2242	Bistrica	بسترتشا	05	131
2243	Sopiste	سوبيست	92	131
2244	Kumanovo	كومانوفو	57	131
2245	Kavadarci	كافادارشي	42	131
2246	Prilep	بريليب	82	131
2247	Kocani	كوكاني	46	131
2248	Samokov	ساموكوف	89	131
2249	Klecevce	Klecevce	45	131
2250	Dolneni	دولنيني	28	131
2251	Dolna Banjica	دولنا بانجيكا	27	131
2252	Vratnica	فراتنيكا	B8	131
2253	Mogila	موغيلا	67	131
2254	Berovo	بيروفو	04	131
2255	Brvenica	بريفينيكا	12	131
2256	Makedonska Kamenica	Makedonska Kamenica	62	131
2257	Sipkovica	Sipkovica	91	131
2258	Delogozdi	ديلوغوجدي	23	131
2259	Delcevo	ديلسيفو	22	131
2260	Vinica	فينيكا	B4	131
2261	Bogomila	بوغوميلا	09	131
2262	Bitola	بيتولا	06	131
2263	Blatec	Blatec	07	131
2264	Cegrane	Cegrane	16	131
2265	Kratovo	كراتوفو	51	131
2266	Bogdanci	بوجدانسي	08	131
2267	Konopiste	Konopiste	49	131
2268	Zelino	زلينو	C3	131
2269	Labunista	Labunista	58	131
2270	Suto Orizari	سوتو اوريزاري	A3	131
2271	Tearce	تيرس	A5	131
2272	Vrutok	فروتوك	B9	131
2273	Staravina	Staravina	95	131
2274	Negotino	نيغوتينو	69	131
2275	Drugovo	درجوفو	30	131
2276	Zletovo	زليتوفو	C5	131
2277	Pehcevo	بيسيفو	78	131
2278	Cesinovo	سيسينوفو	19	131
2279	Capari	Capari	14	131
2280	Kukurecani	Kukurecani	56	131
2281	Vrapciste	فراب سيست	B7	131
2282	Rosoman	روسومان	87	131
2283	Velesta	Velesta	B2	131
2284	Konce	كونس	47	131
2285	Gradsko	جرادسكو	35	131
2286	Kosel	Kosel	50	131
2287	Kisela Voda	كيسيلا فودا	44	131
2288	Jegunovce	جيجنوفسي	38	131
2289	Plasnica	بلاسنيكا	80	131
2290	Kamenjane	Kamenjane	39	131
2291	Izvor	في Izvor	37	131
2292	Struga	ستروغا	99	131
2293	Podares	Podares	81	131
2294	Tetovo	تيتوفو	A6	131
2295	Meseista	Meseista	65	131
2296	Vevcani	فيفكاني	B3	131
2297	Zrnovci	زرنوف سي	C6	131
2298	Kicevo	كيشيفو	43	131
2299	Kuklis	Kuklis	55	131
2300	Koulikoro	كوليكورو	07	132
2301	Mopti	موبتي	04	132
2302	Kayes	كايس	03	132
2305	Tombouctou	تمبكتو	08	132
2306	Segou	سيجو	05	132
2307	Sikasso	سيكاسو	06	132
2308	Bamako	باماكو	01	132
2309	Gao	قاو	09	132
2310	Kidal	كيدال	10	132
2311	Pegu	بيغو	09	133
2312	Mon State	دولة مون	13	133
2313	Kachin State	ولاية كاشين	04	133
2314	Rakhine State	ولاية راخين	01	133
2315	Yangon	يانجون	17	133
2316	Irrawaddy	إيراوادي	03	133
2317	Tenasserim	تيناسيريم	12	133
2318	Karan State	ولاية كاران	05	133
2319	Sagaing	ساغانغ	10	133
2320	Magwe	ماغوي	07	133
2321	Chin State	ولاية تشين	02	133
2322	Shan State	ولاية شان	11	133
2323	Mandalay	ماندالاي	08	133
2326	Kayah State	ولاية كاياه	06	133
2328	Dornogovi	دورنوغوفي	07	134
2329	Omnogovi	أومنجوفي	14	134
2330	Dundgovi	دوندغوفي	08	134
2331	Dzavhan	دزافهان	09	134
2332	Tov	توف	18	134
2333	Suhbaatar	ساهباتار	17	134
2334	Bulgan	بلغان	21	134
2335	Arhangay	آرهانجاي	01	134
2336	Govisumber	Govisumber	24	134
2337	Hentiy	هينتي	11	134
2338	Bayan-Olgiy	بيان-أولجي	03	134
2339	Dornod	دورنود	06	134
2340	Hovsgol	هوفزجول	13	134
2341	Govi-Altay	غوفي ألتاي	10	134
2342	Hovd	هوود	12	134
2343	Selenge	سيلينجي	16	134
2344	Bayanhongor	بيانهونجور	02	134
2345	Ulaanbaatar	أولان باتور	20	134
2346	Ovorhangay	أوفورهانجاي	15	134
2347	Uvs	أوفس	19	134
2348	Darhan-Uul	Darhan-Uul	23	134
2349	Orhon	أورهون	25	134
2350	Ilhas	Ilhas	01	135
2363	Brakna	براكنة	05	138
2364	Hodh Ech Chargui	هده الشوقي	01	138
2365	Gorgol	غورغول	04	138
2366	Assaba	العصابة	03	138
2367	Guidimaka	جواديماكا	10	138
2368	Adrar	أدرار	07	138
2369	Hodh El Gharbi	حوده الغربي	02	138
2370	Tiris Zemmour	تيرس زمور	11	138
2371	Inchiri	إنشيري	12	138
2372	Trarza	ترارزة	06	138
2373	Dakhlet Nouadhibou	داخلة نواذيبو	08	138
2375	Tagant	تاغانت	09	138
2376	Saint Anthony	سانت أنتوني	01	139
2377	Saint Peter	القديس بطرس	03	139
2378	Saint Georges	سانت جورج	02	139
2380	Port Louis	بورت لويس	18	141
2381	Black River	النهر الاسود	12	141
2382	Moka	موكا	15	141
2383	Riviere du Rempart	ريفير دو ريمبارت	19	141
2384	Pamplemousses	بامبليماوسيس	16	141
2385	Rodrigues	رودريغز	23	141
2386	Grand Port	جراند بورت	14	141
2387	Flacq	فلاك	13	141
2388	Plaines Wilhems	بلينز ويلهيمز	17	141
2389	Savanne	سافان	20	141
2392	Seenu	سينو	01	142
2393	Maale	معاليه	40	142
2394	Nkhotakota	نكوتاكوتا	18	143
2395	Rumphi	رومبي	21	143
2396	Mzimba	مزيمبا	15	143
2397	Lilongwe	ليلونغوي	11	143
2398	Ntchisi	نتشيسي	20	143
2399	Salima	سليمة	22	143
2400	Mchinji	مشينجي	13	143
2401	Chitipa	شيتيبا	04	143
2402	Ntcheu	نتشيو	16	143
2403	Dowa	الدوا	07	143
2404	Kasungu	كاسونغو	09	143
2405	Zomba	زومبا	23	143
2406	Nsanje	نسانجي	19	143
2407	Chikwawa	شيكواوا	02	143
2408	Thyolo	ثيولو	05	143
2409	Dedza	ديدزا	06	143
2410	Balaka	بالاكا	26	143
2411	Mangochi	مانغوتشي	12	143
2412	Machinga	مشاينجا	28	143
2413	Nkhata Bay	خليج نخاتا	17	143
2414	Chiradzulu	تشيرادزولو	03	143
2415	Blantyre	بلانتير	24	143
2416	Karonga	كارونجا	08	143
2417	Phalombe	بالومبي	30	143
2418	Mwanza	موانزا	25	143
2419	Mulanje	مولانجي	29	143
2420	Michoacan de Ocampo	ميتشواكان دي أوكامبو	16	144
2421	Chihuahua	تشيهواهوا	06	144
2422	Veracruz-Llave	فيراكروز-افى	30	144
2423	Yucatan	يوكاتان	31	144
2424	Quintana Roo	كوينتانا رو	23	144
2425	Sonora	سونورا	26	144
2426	Tlaxcala	تلاكسكالا	29	144
2427	Chiapas	تشياباس	05	144
2428	Coahuila de Zaragoza	كواهويلا دي سرقسطة	07	144
2429	Durango	دورانجو	10	144
2430	Guanajuato	غواناخواتو	11	144
2431	Nuevo Leon	نويفو ليون	19	144
2432	Oaxaca	أواكساكا	20	144
2433	Tabasco	تاباسكو	27	144
2434	Tamaulipas	تاماوليباس	28	144
2435	Guerrero	غيريرو	12	144
2436	Baja California	باجا كاليفورنيا	02	144
2437	Campeche	كامبيتشي	04	144
2438	Nayarit	ناياريت	18	144
2439	Puebla	بويبلا	21	144
2440	Sinaloa	سينالوا	25	144
2441	Aguascalientes	اغواسكالينتيس	01	144
2442	San Luis Potosi	سان لويس بوتوسي	24	144
2443	Zacatecas	زاكاتيكاس	32	144
2444	Mexico	المكسيك	15	144
2445	Jalisco	خاليسكو	14	144
2446	Hidalgo	الهيدلج من نبلاء الأسبان	13	144
2447	Morelos	موريلوس	17	144
2448	Colima	كوليما	08	144
2449	Queretaro de Arteaga	كويريتارو دي أرتياغا	22	144
2450	Baja California Sur	باجا كاليفورنيا سور	03	144
2451	Distrito Federal	وفي مقاطعة الاتحادية	09	144
2452	Sarawak	ساراواك	11	145
2453	Sabah	صباح	16	145
2454	Melaka	ملقا	04	145
2455	Perlis	برليس	08	145
2456	Negeri Sembilan	نيجري سيمبيلان	05	145
2457	Kedah	كيدا	02	145
2458	Johor	جوهور	01	145
2459	Perak	بيراك	07	145
2460	Pulau Pinang	بولاو بينانج	09	145
2461	Terengganu	تيرينجانو	13	145
2462	Kelantan	كيلانتان	03	145
2463	Pahang	باهانج	06	145
2464	Kuala Lumpur	كوالا لامبور	14	145
2465	Selangor	سيلانغور	12	145
2466	Labuan	لابوان	15	145
2467	Maputo	مابوتو	04	146
2468	Nampula	نامبولا	06	146
2469	Zambezia	زامبيزيا	09	146
2470	Niassa	نياسا	07	146
2471	Cabo Delgado	كابو دلغادو	01	146
2472	Gaza	غزة	02	146
2473	Inhambane	إنهامبان	03	146
2474	Manica	مانيكا	10	146
2475	Tete	تيتي	08	146
2476	Sofala	سوفالا	05	146
2478	Hardap	هارداب	30	147
2479	Otjozondjupa	أوتجوزوندتوبا	39	147
2481	Karas	كاراس	31	147
2482	Omusati	أوموساتي	36	147
2483	Oshana	أوشانا	37	147
2484	Kunene	كونين	32	147
2485	Erongo	إيرونغو	29	147
2486	Oshikoto	أوشيكوتو	38	147
2487	Omaheke	أوماهيكي	35	147
2488	Caprivi	كابريفي	28	147
2489	Okavango	أوكافانغو	34	147
2490	Ohangwena	أوهانغوينا	33	147
2491	Windhoek	ويندهوك	21	147
2493	Niamey	نيامي	05	149
2494	Diffa	ديفا	02	149
2496	Tahoua	تاهوا	06	149
2497	Agadez	أغاديز	01	149
2498	Zinder	زيندر	07	149
2499	Dosso	دوسو	03	149
2500	Maradi	مرادي	04	149
2501	Niamey	نيامي	08	149
2504	Benue	بينو	26	151
2505	Nassarawa	ناساراوا	56	151
2506	Kaduna	كادونا	23	151
2507	Oyo	أويو	32	151
2508	Adamawa	أداماوا	35	151
2509	Osun	أوسان	42	151
2510	Borno	بورنو	27	151
2511	Bauchi	بوتشي	46	151
2513	Ogun	أوجون	16	151
2514	Anambra	انامبرا	25	151
2515	Yobe	يوبي	44	151
2516	Lagos	لاغوس	05	151
2517	Delta	دلتا	36	151
2518	Enugu	إينوغو	47	151
2519	Federal Capital Territory	إقليم العاصمة الفيدرالية	11	151
2520	Kogi	كوجى	41	151
2521	Taraba	تارابا	43	151
2522	Akwa Ibom	أكوا إيبوم	21	151
2523	Ebonyi	إيبوني	53	151
2525	Imo	المنظمة البحرية الدولية	28	151
2526	Jigawa	جيغاوا	39	151
2528	Kwara	كوارا	30	151
2529	Abia	أبيا	45	151
2530	Gombe	غومبي	55	151
2531	Cross River	عبر نهر	22	151
2532	Katsina	كاتسينا	24	151
2533	Sokoto	سوكوتو	51	151
2534	Niger	النيجر	31	151
2535	Zamfara	زامفارا	57	151
2536	Edo	ايدو	37	151
2538	Kano	كانو	29	151
2539	Kebbi	كيبي	40	151
2540	Ekiti	إكيتي	54	151
2541	Bayelsa	بايلسا	52	151
2542	Plateau	هضبة	49	151
2543	Ondo	أوندو	48	151
2544	Rivers	الأنهار	50	151
2547	Leon	ليون	08	152
2548	Chontales	شونتالز	04	152
2549	Managua	ماناغوا	10	152
2550	Autonoma Atlantico Norte	أوتومونا أتلانتيكو نورتي	17	152
2551	Granada	غرناطة	06	152
2552	Matagalpa	ماتاغلبا	12	152
2553	Boaco	بواكو	01	152
2554	Carazo	كارازو	02	152
2555	Chinandega	تشينانديغا	03	152
2556	Rio San Juan	ريو سان خوان	14	152
2557	Rivas	ريفاس	15	152
2558	Masaya	مسايا	11	152
2559	Jinotega	خينوتيغا	07	152
2560	Nueva Segovia	نويفا سيجوفيا	13	152
2561	Region Autonoma Atlantico Sur	منطقة الاستقلال الذاتي اتلانتيكو سور	18	152
2562	Madriz	مادريز	09	152
2563	Esteli	إستيلي	05	152
2564	Drenthe	درينثي	01	153
2565	Zuid-Holland	زويد-هولندا	11	153
2566	Overijssel	أوفيريجسيل	15	153
2567	Noord-Holland	نورد هولاند	07	153
2568	Zeeland	زيلاند	10	153
2569	Limburg	ليمبورغ	05	153
2570	Noord-Brabant	نورد برابانت	06	153
2571	Gelderland	جيلديرلاند	03	153
2572	Friesland	فريسلاند	02	153
2573	Groningen	جرونينجن	04	153
2574	Utrecht	أوتريخت	09	153
2575	Flevoland	فليفولاند	16	153
2576	Nordland	نوردلاند	09	154
2577	Sor-Trondelag	تروندلاج	16	154
2578	Troms	ترومس	18	154
2579	Vestfold	فيستفولد	20	154
2580	Hedmark	هدمارك	06	154
2581	Hordaland	هوردالاند	07	154
2582	Vest-Agder	سترة-أغدر	19	154
2583	More og Romsdal	أكثر أوج رومسدال	08	154
2584	Telemark	تيليمارك	17	154
2585	Buskerud	بوسكيرود	04	154
2586	Rogaland	روغالاند	14	154
2587	Aust-Agder	أوست-أغدر	02	154
2588	Oppland	أوبلاند	11	154
2589	Sogn og Fjordane	سوغن أوغ فيوردان	15	154
2590	Akershus	آكيرشوس	01	154
2591	Nord-Trondelag	نور-ترونديلاغ	10	154
2592	Ostfold	أوستفولد	13	154
2593	Finnmark	فينمارك	05	154
2594	Oslo	أوسلو	12	154
2598	Wellington	ولينغتون	G2	158
2599	West Coast	الساحل الغربي	G3	158
2600	Canterbury	كانتربري	E9	158
2601	Otago	أوتاجو	F7	158
2602	Auckland	أوكلاند	E7	158
2603	Gisborne	جيسبورن	F1	158
2604	Hawke's Bay	خليج هوكس	F2	158
2605	Taranaki	تاراناكي	F9	158
2606	Marlborough	مارلبورو	F4	158
2607	Nelson	نيلسون	F5	158
2608	Waikato	وايكاتو	G1	158
2609	Southland	ساوثلاند	F8	158
2611	Bay of Plenty	خليج بلنتي	E8	158
2613	Manawatu-Wanganui	ماناواتو-وانجانوي	F3	158
2614	Al Batinah	الباطنة	02	159
2615	Az Zahirah	الزاهرة	05	159
2616	Ash Sharqiyah	الشرقية	04	159
2617	Masqat	مسقط	06	159
2618	Musandam	مسندم	07	159
2619	Zufar	ظفار	08	159
2621	Los Santos	لوس سانتوس	07	160
2622	Darien	دارين	05	160
2623	Chiriqui	شيريكي	02	160
2624	Colon	القولون	04	160
2625	Veraguas	فيراغواس	10	160
2626	San Blas	سان بلاس	09	160
2627	Bocas del Toro	بوكاس ديل تورو	01	160
2628	Herrera	هيريرا	06	160
2629	Panama	بناما	08	160
2630	Cocle	كوكلي	03	160
2631	Ancash	انكاش	02	161
2632	Apurimac	ابوريماك	03	161
2633	Arequipa	أريكويبا	04	161
2634	Ica	إيكا	11	161
2635	Cusco	كوسكو	08	161
2636	Lambayeque	امبايكي	14	161
2637	Ucayali	أوكايالي	25	161
2638	La Libertad	لا ليبرتاد	13	161
2639	Ayacucho	اياكوتشو	05	161
2640	Lima	ليما	15	161
2641	Puno	بونو	21	161
2642	Junin	جونين	12	161
2643	Tumbes	أديس أبابا	24	161
2644	Tacna	تاكنا	23	161
2645	Cajamarca	كاخاماركا	06	161
2646	Huancavelica	هوانكافليكا	09	161
2647	Moquegua	موكيجوا	18	161
2648	Amazonas	أمازوناس	01	161
2649	Huanuco	هوانوكو	10	161
2650	San Martin	سان مارتن	22	161
2651	Piura	بيورا	20	161
2652	Loreto	لوريتو	16	161
2653	Pasco	باسكو	19	161
2654	Madre de Dios	مادري دي ديوس	17	161
2655	Callao	كالاو	07	161
2657	Eastern Highlands	المرتفعات الشرقية	09	163
2658	Madang	مادانغ	12	163
2659	Milne Bay	خليج ميلن	03	163
2660	Western	الغربي	06	163
2661	Central	وسط	01	163
2662	Sandaun	ساندون	18	163
3295	Nan	نان	04	201
2663	East Sepik	شرق سيبيك	11	163
2664	West New Britain	غرب بريطانيا الجديدة	17	163
2665	Southern Highlands	المرتفعات الجنوبية	05	163
2666	Northern	شمالي	04	163
2667	Gulf	خليج	02	163
2668	Western Highlands	المرتفعات الغربية	16	163
2669	Morobe	موروبى	14	163
2670	Chimbu	شيمبو	08	163
2671	East New Britain	شرق بريطانيا الجديدة	10	163
2672	North Solomons	شمال سولومونز	07	163
2673	Enga	انجا	19	163
2674	Manus	اليد	13	163
2675	New Ireland	أيرلندا الجديدة	15	163
2676	National Capital	رأس المال الوطني	20	163
2677	Pangasinan	بانجاسينان	51	164
2678	Cebu	سيبو	21	164
2679	Samar	سمر	55	164
2680	Camarines Sur	كامارينز سور	16	164
2681	Iloilo	لويلو	30	164
2682	Ilocos Norte	ايلوكوس نورتي	28	164
2683	Antique	أثر قديم	06	164
2684	Bohol	بوهول	11	164
2685	Cagayan	كاجايان	14	164
2686	Eastern Samar	سمر الشرقية	23	164
2687	Davao	دافاو	24	164
2688	Leyte	يتي	37	164
2689	Masbate	ماسبات	39	164
2690	Negros Occidental	نيجروس اوكسيدنتال	45	164
2691	Nueva Vizcaya	نويفا فيزكايا	48	164
2692	Romblon	رومبلون	54	164
2693	South Cotabato	جنوب كوتاباتو	70	164
2694	Ilocos Sur	ايلوكوس سور	29	164
2695	Quezon	كويزون	H2	164
2696	Lanao del Norte	لاناو ديل نورتي	34	164
2697	North Cotabato	شمال كوتاباتو	57	164
2698	Surigao del Sur	سوريجاو ديل سور	62	164
2699	Iligan	اليجان	C8	164
2700	Southern Leyte	جنوب ليتي	59	164
2701	Tarlac	تارلاك	63	164
2702	Bukidnon	بوكيدنون	12	164
2703	Mindoro Occidental	ميندورو اوكسيدنتال	40	164
2704	Palawan	بالاوان	49	164
2705	Abra	العبرة	01	164
2706	Bulacan	بولاكان	13	164
2707	Capiz	كابيز	18	164
2708	Nueva Ecija	Nueva Ecija	47	164
2709	Sorsogon	سورسوجون	58	164
2710	Benguet	بينجويت	10	164
2711	Northern Samar	شمال سمر	67	164
2712	Quirino	كويرينو	68	164
2713	Isabela	ايزابيلا	31	164
2714	Kalinga-Apayao	كالينجا-أباياو	32	164
2715	Mountain	جبل	44	164
2716	Albay	الباي	05	164
2717	Batangas	باتانجاس	09	164
2718	Catanduanes	كاتاندونيز	19	164
2719	Negros Oriental	نيجروس أورينتال	46	164
2720	Ifugao	إيفوغاو	27	164
2721	Misamis Oriental	ميساميس اورينتال	43	164
2722	Laguna	لاغونا	33	164
2723	Zamboanga del Sur	زامبوانجا ديل سور	66	164
2724	Camiguin	كاميجوين	17	164
2725	Negros Occidental	نيجروس اوكسيدنتال	H3	164
2726	Bataan	باتان	07	164
2727	Lanao del Sur	لاناو ديل سور	35	164
2728	Basilan	باسيلان	22	164
2729	La Union	لا يونيون	36	164
2730	Camarines Norte	كامارينز نورتي	15	164
2731	Caloocan	كالوكان	B4	164
2732	Legaspi	يغاسبي	D5	164
2733	Calbayog	من Calbayog	B3	164
2734	Agusan del Norte	أغوسان ديل نورتي	02	164
2735	Pampanga	بامبانجا	50	164
2736	Mindoro Oriental	ميندورو الشرقية	41	164
2738	Sulu	سولو	60	164
2739	Cebu City	مدينة سيبو	B7	164
2740	Roxas	روكساس	F3	164
2741	Misamis Occidental	ميساميس اوكسيدنتال	42	164
2742	Aklan	اكلان	04	164
2743	Maguindanao	ماجوينداناو	56	164
2744	Dumaguete	دوماغويتي	C5	164
2745	Surigao del Norte	سوريجاو ديل نورتي	61	164
2746	Ormoc	اورموك	E4	164
2747	Davao del Sur	دافاو ديل سور	25	164
2748	Zambales	زامباليس	64	164
2749	Agusan del Sur	أغوسان ديل سور	03	164
2751	Lapu-Lapu	لابو لابو لابو	D4	164
2752	Marinduque	ماريندوك	38	164
2753	Rizal	ريزال	53	164
2754	Butuan	بوتوان	A8	164
2755	Cagayan de Oro	كاجايان دي أورو	B2	164
2756	Pasay	باساي	E9	164
2757	Sultan Kudarat	سلطان كودارات	71	164
2758	Davao City	مدينة دافاو	C3	164
2759	Cavite	كافيت	20	164
2760	Iloilo City	مدينة ايلويلو	C9	164
2761	Silay	سيالي	F8	164
2762	Pagadian	باجاديان	E7	164
2763	Trece Martires	تريسي مارتيرز	G6	164
2764	Quezon City	مدينة كويزون	F2	164
2765	Siquijor	سيكويجور	69	164
2766	Cotabato	كوتاباتو	B8	164
2767	Angeles	لوس	A1	164
2768	Toledo	توليدو	G5	164
2769	San Carlos	سان كارلوس	F4	164
2770	Lipa	ليبا	D6	164
2771	Davao Oriental	دافاو اورينتال	26	164
2772	Tacloban	تاكلوبان	G1	164
2773	Tawitawi	من Tawitawi	72	164
2775	Zamboanga del Norte	Zamboanga del Norte	65	164
2776	Zamboanga	زامبوانغا	G7	164
2777	Bacolod	باكولود	A2	164
2778	Marawi	مراوي	E1	164
2779	Aurora	فجر	G8	164
2780	Ozamis	من Ozamis	E6	164
2781	Danao	داناو	C1	164
2782	Bago	باجو	A3	164
2783	Cabanatuan	كاباناتوان	A9	164
2785	Baguio	باجيو	A4	164
2786	Tangub	تانجوب	G4	164
2787	Naga	النجا	E2	164
2788	Olongapo	اولونجابو	E3	164
2789	San Pablo	سان بابلو	F7	164
2790	Oroquieta	Oroquieta	E5	164
2791	Manila	مانيلا	D9	164
2792	San Juan	سان خوان	M6	164
2793	General Santos	الجنرال سانتوس	C6	164
2794	Dapitan	Dapitan	C2	164
2795	Canlaon	Canlaon	B5	164
2796	Dagupan	داغوبان	B9	164
2798	Batanes	باتانيس	08	164
2799	Batangas City	باتانجاس سيتي	A7	164
2800	Dipolog	من Dipolog	C4	164
2802	Tagbilaran	تاغبيلاران	G3	164
2803	Cadiz	كاديز	B1	164
2804	Mandaue	مانداوي	D8	164
2805	Cavite City	مدينة كافيت	B6	164
2806	Tagaytay	تاجايتاى	G2	164
2807	Gingoog	Gingoog	C7	164
2808	Iriga	Iriga	D1	164
2809	Paranaque	Paranaque	L7	164
2811	La Carlota	لا كارلوتا	D2	164
2812	Laoag	اواج	D3	164
2813	Lucena	لوسينا	D7	164
2814	Malaybalay	مالايبالاي	K6	164
2815	Palayan	Palayan	E8	164
2816	Puerto Princesa	بويرتو برنسيسا	F1	164
2817	Surigao	سوريجاو	F9	164
2818	Punjab	البنجاب	04	165
2819	Sindh	السند	05	165
2820	Balochistan	بلوشستان	02	165
2821	North-West Frontier	الحدود الشمالية الغربية	03	165
2822	Northern Areas	المناطق الشمالية	07	165
2823	Federally Administered Tribal Areas	المناطق القبلية الخاضعة للإدارة الاتحادية	01	165
2824	Azad Kashmir	آزاد كشمير	06	165
2825	Islamabad	اسلام اباد	08	165
2833	Zachodniopomorskie	زاخودنيبومورسكي	87	166
2835	Swietokrzyskie	سفيتوكرجيسكي	84	166
2864	Lodzkie	ودزكي	74	166
2866	Warminsko-Mazurskie	فارمينسكو مازورسكي	85	166
2872	Malopolskie	مالوبولسكا	77	166
2874	Mazowieckie	مازوفيتسكي	78	166
2876	Podlaskie	بودلاسكي	81	166
2880	Podkarpackie	بودكارباتسكي	80	166
2881	Lubuskie	وبوسكي	76	166
2882	Dolnoslaskie	DOLNOSLASKIE	72	166
2883	Lubelskie	وبليسكي	75	166
2884	Pomorskie	بومورسكي	82	166
2885	Kujawsko-Pomorskie	كوجاوسكو بومورسكي	73	166
2886	Wielkopolskie	فيلكوبولسكي	86	166
2887	Slaskie	سلاسكي	83	166
2888	Opolskie	أوبولسكي	79	166
2893	Braga	براغا	04	170
2894	Vila Real	فيلا ريال	21	170
2895	Santarem	سانتاريم	18	170
2896	Leiria	ليريا	13	170
2897	Lisboa	لشبونة	14	170
2898	Braganca	براغانكا	05	170
2899	Viana do Castelo	فيانا دو كاستيلو	20	170
2900	Portalegre	بورتاليجري	16	170
2901	Setubal	سيتوبال	19	170
2902	Azores	الأزور	23	170
2903	Viseu	فيسيو	22	170
2904	Porto	بورتو	17	170
2905	Aveiro	افيرو	02	170
2906	Castelo Branco	كاستيلو برانكو	06	170
2907	Faro	فارو	09	170
2908	Coimbra	كويمبرا	07	170
2909	Madeira	الماديرا	10	170
2910	Beja	باجة	03	170
2911	Guarda	غواردا	11	170
2912	Evora	ايفورا	08	170
2914	Cordillera	كورديليرا	08	172
2915	Alto Parana	ألتو بارانا	01	172
2916	Caazapa	كازابا	05	172
2917	Boqueron	بوكورون	24	172
2918	Paraguari	Paraguari	15	172
2919	Amambay	أمامباي	02	172
3402	Siliana	سليانة	22	205
2920	Alto Paraguay	ألتو باراجواي	23	172
2921	Canindeyu	كانينديو	19	172
2922	Concepcion	كونسيبسيون	07	172
2923	Misiones	ميسيونيس	12	172
2924	Caaguazu	كاغوازو	04	172
2925	Neembucu	نيمبوكو	13	172
2926	Itapua	إيتابوا	11	172
2927	Central	وسط	06	172
2928	San Pedro	حي سان بيدرو	17	172
2929	Presidente Hayes	سيادة الرئيس هايز	16	172
2930	Guaira	جويرا	10	172
2931	Madinat ach Shamal	مدينة شمال شمالي	08	173
2932	Ad Dawhah	الدوحة	01	173
2933	Umm Salal	أم صلال	09	173
2934	Al Khawr	الخور	04	173
2935	Al Jumaliyah	الجميلية	03	173
2936	Al Wakrah Municipality	بلدية الوكرة	05	173
2938	Ilfov	إيلفوف	43	175
2939	Giurgiu	غيورغيو	42	175
2940	Bihor	بيهور	05	175
2941	Caras-Severin	كاراس سيفيرين	12	175
2942	Mehedinti	ميهيدينتي	26	175
2943	Vaslui	فاسلوي	38	175
2944	Tulcea	تولسيا	37	175
2945	Constanta	كونستانتا	14	175
2946	Mures	موريس	27	175
2947	Harghita	هارغيتا	20	175
2948	Alba	ألبا	01	175
2949	Arad	اراد	02	175
2950	Hunedoara	هونيدوارا	21	175
2951	Satu Mare	ساتو ماري	32	175
2952	Sibiu	سيبيو	33	175
2953	Maramures	مارامريس	25	175
2954	Brasov	براسوف	09	175
2955	Cluj	كلوج	13	175
2956	Teleorman	تيليورمان	35	175
2957	Dambovita	دامبوفيتا	16	175
2958	Dolj	دولج	17	175
2959	Suceava	سوسيفا	34	175
2960	Botosani	بوتوساني	07	175
2961	Iasi	اياسي	23	175
2962	Arges	ارجيس	03	175
2963	Buzau	بوزاو	11	175
2964	Timis	تيم هو	36	175
2965	Neamt	نيمت	28	175
2966	Bacau	باكاو	04	175
2967	Braila	برايلا	08	175
2968	Salaj	سالاج	31	175
2969	Covasna	كوفاسنا	15	175
2970	Bistrita-Nasaud	بيستريتا ناسود	06	175
2971	Calarasi	كالاراسي	41	175
2972	Gorj	غورج	19	175
2973	Ialomita	ايالوميتا	22	175
2974	Olt	أولت	29	175
2975	Valcea	فالسيا	39	175
2976	Prahova	براهوفا	30	175
2977	Vrancea	فرانتشا	40	175
2978	Bucuresti	بوخارست	10	175
2979	Galati	جالاتي	18	175
2980	\\"Vojvodina\\"	\\"فويفودينا\\"	02	0
2981	\\"Kosovo\\"	\\"كوسوفو\\"	01	0
2983	Moskva	موسكفا	47	176
2984	Karelia	كاريليا	28	176
2985	Sakha	سخا	63	176
2987	Altaisky krai	التيسكي كراي	04	176
2988	Ivanovo	إيفانوفو	21	176
2989	Kostroma	كوستروما	37	176
2990	Nizhegorod	Nizhegorod	51	176
2991	Tver'	تفير \\"	77	176
2992	Vladimir	فلاديمير	83	176
2993	Perm'	موج الشعر بإستمرار'	58	176
2994	Adygeya	أديغيا	01	176
2995	Chita	تشيتا	14	176
2996	Taymyr	Taymyr	74	176
2997	Kemerovo	كيميروفو	29	176
2998	Udmurt	الأدمرت	80	176
2999	Khakass	Khakass	31	176
3000	Vologda	فولوغدا	85	176
3001	Omsk	أومسك	54	176
3002	Orenburg	أورينبورغ	55	176
3003	Irkutsk	إيركوتسك	20	176
3004	Krasnoyarsk	كراسنويارسك	39	176
3005	Sverdlovsk	سفيردلوفسك	71	176
3006	Tambovskaya oblast	Tambovskaya أوبلاست	72	176
3007	Arkhangel'sk	Arkhangel'sk	06	176
3008	Novosibirsk	نوفوسيبيرسك	53	176
3009	Ryazan'	ريازان \\"	62	176
3010	Tula	تولا	76	176
3011	Rostov	روستوف	61	176
3012	Yaroslavl'	ياروسلافل \\"	88	176
3013	Tatarstan	تتارستان	73	176
3014	Tyumen'	تيومين \\"	78	176
3015	Penza	بينزا	57	176
3016	Saratov	ساراتوف	67	176
3017	Chuvashia	تشوفاشيا	16	176
3018	Komi	كومي	34	176
3019	Bryansk	بريانسك	10	176
3020	Samara	الثمرة الجناحية	65	176
3022	Mariy-El	جمهورية ماري ايل	45	176
3023	Leningrad	لينينغراد	42	176
3024	Kirov	كيروف	33	176
3025	Gorno-Altay	غورنو ألتاي	03	176
3026	Dagestan	داغستان	17	176
3027	Kabardin-Balkar	قبردينو بلقاريا	22	176
3028	Amur	آمور	05	176
3029	North Ossetia	اوسيتيا الشمالية	68	176
3030	Karachay-Cherkess	كراشاي-الشركس	27	176
3031	Krasnodar	كراسنودار	38	176
3032	Lipetsk	ليبيتسك	43	176
3033	Smolensk	سمولينسك	69	176
3034	Kaliningrad	كالينينغراد	23	176
3035	Bashkortostan	باشكورتوستان	08	176
3036	Chelyabinsk	تشيليابينسك	13	176
3037	Ul'yanovsk	Ul'yanovsk	81	176
3038	Stavropol'	ستافروبول \\"	70	176
3039	Kurgan	كورغان	40	176
3040	Astrakhan'	أستراخان \\"	07	176
3041	Volgograd	فولغوغراد	84	176
3042	Kalmyk	الكالميك	24	176
3043	Kaluga	كالوغا	25	176
3044	Magadan	ماجادان	44	176
3045	Pskov	بسكوف	60	176
3046	Orel	أوريل	56	176
3047	Primor'ye	Primor'ye	59	176
3048	Belgorod	بيلغورود	09	176
3049	Buryat	بوريات	11	176
3050	Tomsk	تومسك	75	176
3051	Murmansk	مورمانسك	49	176
3053	Sakhalin	سخالين	64	176
3054	Voronezh	فورونيج	86	176
3055	Novgorod	نوفغورود	52	176
3056	Mordovia	موردوفيا	46	176
3057	Kamchatka	كامتشاتكا	26	176
3058	Khabarovsk	خاباروفسك	30	176
3059	Koryak	كورياك	36	176
3060	Chukot	Chukot	15	176
3061	Khanty-Mansiy	خانتي-Mansiy	32	176
3062	Kursk	كورسك	41	176
3063	Aginsky Buryatsky AO	Aginsky Buryatsky AO	02	176
3064	Tuva	تو فا	79	176
3065	Nenets	نينيتس	50	176
3066	Evenk	Evenk	18	176
3067	Yevrey	Yevrey	89	176
3069	Yamal-Nenets	يامال نينيتس	87	176
3070	Saint Petersburg City	مدينة سانت بطرسبرغ	66	176
3071	Moscow City	مدينة موسكو	48	176
3072	Kigali	كيغالي	09	177
3073	Butare	ولكن ل	01	177
3077	Kibungo	كيبيونغو	07	177
3080	Gitarama	غيتامارا	06	177
3082	Makkah	مكه	14	178
3083	Ar Riyad	الرياض	10	178
3084	Ha'il	وابل	13	178
3085	Al Hudud ash Shamaliyah	الحدود الشمالية	15	178
3086	Jizan	جازان	17	178
3087	Ash Sharqiyah	الشرقية	06	178
3088	Al Madinah	المدينة	05	178
3089	Al Qasim	القاسم	08	178
3090	Al Bahah	الباحة	02	178
3091	Tabuk	تبوك	19	178
3092	Al Jawf	الجوف	20	178
3094	Makira	ماكيرا	08	179
3096	Beau Vallon	بيو فالون	08	180
3098	Bahr al Ghazal	بحر الغزال	32	181
3100	River Nile	نهر النيل	53	181
3101	Darfur	دارفور	33	181
3102	Kurdufan	كردفان	34	181
3103	Al Wusta	الوسطى	27	181
3104	Ash Shamaliyah	الرماد الشمالي	30	181
3105	Ash Sharqiyah	الشرقية	31	181
3106	Al Istiwa'iyah	الاستيوة	28	181
3110	Al Khartum	الخرطوم	29	181
3113	Northern Darfur	شمال دارفور	55	181
3119	Central Equatoria State	ولاية وسط الاستوائية	44	181
3120	Al Wahadah State	ولاية الوحده	40	181
3121	Kassala	كسلا	52	181
3124	Southern Kordofan	جنوب كردفان	50	181
3126	Upper Nile	أعالي النيل	35	181
3127	Southern Darfur	جنوب دارفور	49	181
3133	Vasternorrlands Lan	Vasternorrlands لان	24	182
3134	Vastra Gotaland	فاسترا جوتلاند	28	182
3135	Norrbottens Lan	نوربوتنز لان	14	182
3136	Vasterbottens Lan	فاستربوتينز لان	23	182
3137	Skane Lan	سكين لان	27	182
3138	Kalmar Lan	كالمار لان	09	182
3139	Jamtlands Lan	جامتلاندز لان	07	182
3140	Kronobergs Lan	كرونوبيرز لان	12	182
3141	Ostergotlands Lan	Ostergotlands لان	16	182
3142	Stockholms Lan	ستوكهلم لان	26	182
3143	Dalarnas Lan	دالارناس لان	10	182
3144	Blekinge Lan	بليكينج لان	02	182
3145	Gavleborgs Lan	جافليبورجس لان	03	182
3146	Sodermanlands Lan	سوديرمانلاندز لان	18	182
3147	Vastmanlands Lan	فاستمانلاندس لان	25	182
3148	Varmlands Lan	فارملاند لان	22	182
3149	Hallands Lan	هولاندز لان	06	182
3150	Orebro Lan	أوربرو لان	15	182
3151	Uppsala Lan	أوبسالا لان	21	182
3152	Jonkopings Lan	جونكوبنج لان	08	182
3153	Gotlands Lan	جوتلاندز لان	05	182
3156	Bohinj Commune	بوهينج كوميون	04	185
3157	Brezovica Commune	Brezovica Commune	09	185
3160	Kosice	كوسيتش	03	187
3161	Banska Bystrica	بانسكا بيستريكا	01	187
3162	Nitra	نيترا	04	187
3163	Trnava	ترنافا	07	187
3164	Presov	بريسوف	05	187
3165	Zilina	زيلينا	08	187
3166	Bratislava	براتيسلافا	02	187
3167	Trencin	ترينشن	06	187
3169	Western Area	المنطقة الغربية	04	188
3170	Northern	شمالي	02	188
3171	Eastern	الشرقية	01	188
3172	Southern	جنوبي	03	188
3173	Acquaviva	أكوافيفا	01	189
3174	Chiesanuova	كيسانيوفا	02	189
3175	San Marino	سان مارينو	07	189
3176	Serravalle	سيرافالي	09	189
3177	Dakar	داكار	01	190
3179	Diourbel	ديوربيل	03	190
3181	Kolda	كولدا	11	190
3182	Ziguinchor	زيغينشور	12	190
3183	Thies	تييس	07	190
3184	Fatick	فاتيك	09	190
3185	Kaolack	كاولاك	10	190
3186	Tambacounda	تامباكوندا	05	190
3187	Louga	وغا	13	190
3188	Matam	ماتام	15	190
3189	Saint-Louis	سانت لويس	14	190
3191	Bay	خليج	04	191
3192	Shabeellaha Hoose	Shabeellaha Hoose	14	191
3193	Bakool	باكول	01	191
3194	Hiiraan	هيران	07	191
3195	Gedo	جدو	06	191
3196	Bari	باري	03	191
3197	Galguduud	غالغودود	05	191
3198	Mudug	مدق	10	191
3199	Woqooyi Galbeed	Woqooyi Galbeed	16	191
3200	Jubbada Dhexe	جوبادا ديكسي	08	191
3201	Shabeellaha Dhexe	Shabeellaha Dhexe	13	191
3202	Jubbada Hoose	جوبادا هووز	09	191
3204	Nugaal	نوغال	11	191
3205	Sanaag	سناج	12	191
3206	Banaadir	بنادر	02	191
3208	Brokopondo	بروكوبوندو	10	192
3209	Sipaliwini	سيباليويني	18	192
3210	Marowijne	ماروويجني	13	192
3211	Para	الفقرة	15	192
3212	Commewijne	كوميويجني	11	192
3213	Saramacca	سارامكا	17	192
3214	Nickerie	نيكيري	14	192
3215	Coronie	كوروني	12	192
3216	Wanica	وانيكا	19	192
3217	Paramaribo	باراماريبو	16	192
3218	Sao Tome	ساو تومي	02	193
3219	Principe	برينسيبي	01	193
3220	Sonsonate	سونسوناتي	13	194
3221	Morazan	مورازان	08	194
3222	San Vicente	سان فيسينتي	12	194
3223	La Union	لا يونيون	07	194
3224	San Salvador	سان سلفادور	10	194
3225	Chalatenango	شالاتنانغو	03	194
3226	La Libertad	لا ليبرتاد	05	194
3227	Cabanas	كاباناس	02	194
3228	Cuscatlan	كوسكاتلان	04	194
3229	Usulutan	أوسولوتان	14	194
3230	Ahuachapan	اهواتشابان	01	194
3231	Santa Ana	سانتا آنا	11	194
3232	San Miguel	سان ميغيل	09	194
3233	La Paz	لاباز	06	194
3234	Al Hasakah	الحسكة	01	195
3235	Ar Raqqah	الرقة	04	195
3236	Tartus	طرطوس	14	195
3237	Rif Dimashq	ريف دمشق	08	195
3238	Hims	حمص	11	195
3239	Idlib	إدلب	12	195
3240	Hamah	حماه	10	195
3241	Halab	حلب	09	195
3242	Al Qunaytirah	القنيطرة	03	195
3243	Dar	دار	06	195
3244	As Suwayda'	كما السويداء	05	195
3245	Al Ladhiqiyah	اللاذقية	02	195
3246	Dayr az Zawr	دير الزور	07	195
3247	Dimashq	دمشق	13	195
3248	Lubombo	وبومبو	02	196
3249	Hhohho	هوهو	01	196
3250	Manzini	مانزيني	03	196
3251	Shiselweni	شيزلويني	04	196
3253	Ouaddai	واداي	12	198
3254	Biltine	بيلتين	02	198
3255	Batha	البطحاء	01	198
3256	Mayo-Kebbi	مايو-كيبي	10	198
3257	Chari-Baguirmi	شاري باغيرمي	04	198
3258	Guera	غويرا	05	198
3259	Salamat	سلامات	13	198
3260	Kanem	كانم	06	198
3261	Logone Occidental	لوجون اوكسيدنتال	08	198
3262	Lac	لاك	07	198
3263	Borkou-Ennedi-Tibesti	بوركو إندي تيبستي	03	198
3264	Tandjile	تانجيل	14	198
3265	Moyen-Chari	موين شاري	11	198
3266	Logone Oriental	لوجوني اورينتال	09	198
3268	Plateaux	الهضاب	25	200
3281	Kara	كارا	23	200
3289	Savanes	السافانا	26	200
3290	Centrale	المركزية	22	200
3292	Maritime	بحري	24	200
3293	Trat	ترات	49	201
3294	Chiang Mai	تشيانغ ماي	02	201
3296	Prachin Buri	براشين بوري	45	201
3297	Krabi	كرابي	63	201
3298	Sakon Nakhon	ساكون ناخون	20	201
3299	Nakhon Phanom	ناخون فانوم	73	201
3300	Amnat Charoen	أمنات تشاروين	77	201
3301	Samut Songkhram	ساموت سونغخرام	54	201
3302	Nakhon Sawan	ناخون صوان	16	201
3303	Kanchanaburi	كانشانابوري	50	201
3304	Ubon Ratchathani	أوبون راتشاثاني	71	201
3305	Chumphon	شومفون	58	201
3306	Chachoengsao	شاشوينجساو	44	201
3307	Sa Kaeo	سا كايو	80	201
3308	Roi Et	روي إت	25	201
3309	Narathiwat	ناراثيوات	31	201
3310	Pattani	باتاني	69	201
3311	Chaiyaphum	تشايافوم	26	201
3312	Kalasin	كالاسين	23	201
3313	Chon Buri	تشون بوري	46	201
3314	Sukhothai	سوخوثاي	09	201
3315	Surat Thani	سورة ثاني	60	201
3317	Phra Nakhon Si Ayutthaya	فرا ناخون سي أيوتثايا	36	201
3318	Nonthaburi	نونثابوري	38	201
3319	Samut Prakan	ساموت براكان	42	201
3320	Ang Thong	آنج ثونغ	35	201
3321	Krung Thep	كرونج ثيب	40	201
3322	Phitsanulok	فيتسانولوك	12	201
3323	Nakhon Pathom	ناخون باتوم	53	201
3324	Phichit	فيشيت	13	201
3325	Ratchaburi	راتشابوري	52	201
3326	Suphan Buri	سوفان بوري	51	201
3327	Sing Buri	الغناء بوري	33	201
3328	Prachuap Khiri Khan	براشواب خيرى خان	57	201
3329	Lamphun	امفون	05	201
3330	Rayong	رايونج	47	201
3331	Ubon Ratchathani	أوبون راتشاثاني	75	201
3332	Chai Nat	شاي نات	32	201
3333	Buriram	بوريرام	28	201
3334	Phetchaburi	فيتشابوري	56	201
3335	Tak	تاك	08	201
3336	Phayao	فاياو	41	201
3337	Lop Buri	لوب بوري	34	201
3338	Saraburi	سارابوري	37	201
3339	Nakhon Nayok	ناخون نايوك	43	201
3340	Yala	يالا	70	201
3341	Nakhon Ratchasima	ناخون راتشاسيما	27	201
3342	Samut Sakhon	ساموت ساخون	55	201
3343	Khon Kaen	خون كاين	22	201
3344	Uthai Thani	يوثاي ثاني	15	201
3345	Nong Khai	نونغ خاي	17	201
3346	Maha Sarakham	مها ساراخام	24	201
3347	Lampang	امبانج	06	201
3348	Songkhla	سونغكلا	68	201
3349	Nakhon Si Thammarat	ناخون سي ثامارات	64	201
3350	Loei	ويي	18	201
3351	Chiang Rai	شيانج راي	03	201
3352	Surin	سورين	29	201
3353	Phetchabun	فيتشابون	14	201
3354	Phrae	فراى	07	201
3355	Phangnga	فانغ نغا	61	201
3356	Uttaradit	أوتاراديت	10	201
3357	Sisaket	سيساكيت	30	201
3358	Trang	ترانج	65	201
3359	Kamphaeng Phet	كامبينغ فيت	11	201
3360	Phuket	فوكيت	62	201
3361	Mukdahan	موكداهان	78	201
3362	Yasothon	ياسوثون	72	201
3363	Phatthalung	فاتهالونج	66	201
3364	Pathum Thani	باثوم ثاني	39	201
3365	Chanthaburi	شانثابوري	48	201
3366	Mae Hong Son	ماي هونغ سون	01	201
3367	Ranong	رانونج	59	201
3368	Udon Thani	أودون ثاني	76	201
3369	Satun	ساتون	67	201
3370	Nong Bua Lamphu	نونغ بوا لامفو	79	201
3371	Nakhon Phanom	ناخون فانوم	21	201
3372	Khatlon	خاتلون	02	202
3373	Sughd	صغد	03	202
3374	Kuhistoni Badakhshon	كوهستوني بدخشون	01	202
3376	Lebap	يباب	04	204
3377	Balkan	البلقان	02	204
3378	Ahal	آهال	01	204
3380	Mary	مريم العذراء	05	204
3381	Dashoguz	داشوغوز	03	204
3382	Madanin	Madanin	28	205
3383	El Kef	الكاف	14	205
3384	Tozeur	توزر	35	205
3385	Sousse	سوسة	23	205
3386	Gabes	قابس	29	205
3387	Sfax	صفاقس	32	205
3388	Bizerte	بنزرت	18	205
3389	Al Munastir	المنستير	16	205
3390	Nabeul	نابل	19	205
3391	Kasserine	القصرين	02	205
3392	Tataouine	تطاوين	34	205
3393	Sidi Bou Zid	سيدي بوزيد	33	205
3394	Al Mahdia	المهدية	15	205
3395	Jendouba	جندوبة	06	205
3396	Ben Arous	بن عروس	27	205
3397	Kairouan	القيروان	03	205
3398	Zaghouan	زغوان	37	205
3399	Kebili	قبلي	31	205
3400	Bajah	باجه	17	205
3404	Tunis	تونس	36	205
3405	Tongatapu	تونجاتابو	02	206
3406	Ha	ها	01	206
3407	Vava	فافا	03	206
3408	Amasya	أماسيا	05	207
3409	Hatay	هاتاي	31	207
3410	Diyarbakir	ديار بكر	21	207
3411	Adana	أضنة	81	207
3412	Bolu	بولو	14	207
3413	Ankara	أنقرة	68	207
3414	Konya	قونية	71	207
3415	Bilecik	بيلجيك	11	207
3416	Izmir	إزمير	35	207
3417	Tokat	توكات	60	207
3418	Edirne	أدرنة	22	207
3419	Kirsehir	كيرسهير	40	207
3420	Van	سيارة نقل	65	207
3421	Kastamonu	كاستامونو	37	207
3422	Sivas	سيفاس	58	207
3423	Denizli	دنيزلي	20	207
3424	Kutahya	كوتاهيا	43	207
3425	Bingol	بينغول	12	207
3426	Kahramanmaras	كهرمان ماراس	46	207
3427	Sanliurfa	سانليورفا	63	207
3428	Agri	الزراعية	04	207
3429	Eskisehir	اسكيسهير	26	207
3430	Malatya	ملاطية	44	207
3431	Adiyaman	أديامان	02	207
3432	Giresun	جيرسون	28	207
3433	Mus	المصحف	49	207
3434	Corum	كوروم	19	207
3435	Erzurum	أرضروم	25	207
3436	Mersin	مرسين	32	207
3437	Aydin	أيدين	09	207
3438	Nevsehir	نفسهير	50	207
3439	Manisa	مانيسا	45	207
3440	Canakkale	كاناكالي	17	207
3441	Ordu	أوردو	52	207
3442	Yozgat	يوزغات	66	207
3443	Tunceli	تونجلي	62	207
3444	Mardin	ماردين	72	207
3445	Sinop	سينوب	57	207
3446	Antalya	أنطاليا	07	207
3447	Erzincan	ارزينجان	24	207
3448	Artvin	أرتفين	08	207
3449	Sakarya	ساكاريا	54	207
3450	Afyonkarahisar	أفيون قره حصار	03	207
3451	Bursa	بورصة	16	207
3452	Trabzon	طرابزون	61	207
3453	Tekirdag	ستنعم	59	207
3454	Kilis	كيليس	90	207
3455	Gaziantep	غازي عنتاب	83	207
3456	Sirnak	سيرناك	80	207
3457	Balikesir	باليكسير	10	207
3458	Elazig	إيلازيغ	23	207
3459	Ardahan	أردهان	86	207
3460	Batman	الرجل الوطواط	76	207
3461	Kayseri	قيصري	38	207
3462	Kocaeli	قوجا	41	207
3463	Samsun	سامسون	55	207
3464	Isparta	اسبرطة	33	207
3465	Mugla	موغلا	48	207
3466	Bitlis	بتليس	13	207
3467	Rize	ريزي	53	207
3468	Hakkari	هكاري	70	207
3469	Istanbul	اسطنبول	34	207
3470	Karaman	كرمان	78	207
3471	Igdir	اجدير	88	207
3472	Nigde	نيغدة	73	207
3473	Usak	اوساك	64	207
3474	Siirt	سيرت	74	207
3475	Kirklareli	كيركلاريلي	39	207
3476	Burdur	بوردور	15	207
3477	Gumushane	جوموشان	69	207
3478	Osmaniye	عثمانية	91	207
3479	Yalova	يالوفا	92	207
3480	Kars	كارس	84	207
3481	Tobago	توباغو	11	208
3482	Caroni	كاروني	02	208
3483	Saint David	القديس داود	07	208
3484	Arima	اريما	01	208
3485	Saint George	القديس جورج	08	208
3486	Saint Patrick	سانت باتريك	09	208
3487	Victoria	فيكتوريا	12	208
3488	Nariva	ناريفا	04	208
3489	Port-of-Spain	ميناء اسبانيا	05	208
3490	Saint Andrew	القديس أندرو	06	208
3491	Mayaro	مايارو	03	208
3492	San Fernando	سان فرناندو	10	208
3494	T'ai-wan	تاي وان	04	210
3495	T'ai-pei	تاي-بى	03	210
3496	Fu-chien	فو شين	01	210
3497	Kao-hsiung	كاو هسيونج،	02	210
3499	Tabora	تابورا	17	211
3500	Manyara	مانيارا	27	211
3501	Mtwara	متوارا	11	211
3502	Lindi	ليندي	07	211
3503	Ruvuma	روفوما	14	211
3504	Iringa	إيرينغا	04	211
3505	Tanga	طنجة	18	211
3506	Pemba South	بيمبا الجنوبية	20	211
3507	Kagera	كاجيرا	19	211
3508	Arusha	أروشا	26	211
3509	Mwanza	موانزا	12	211
3510	Kilimanjaro	كليمنجارو	06	211
3511	Pwani	بواني	02	211
3512	Zanzibar Central	زنجبار الوسطى	21	211
3513	Dodoma	دودوما	03	211
3514	Shinyanga	شينيانغا	15	211
3515	Zanzibar Urban	زنجبار الحضري	25	211
3516	Pemba North	بيمبا الشمالية	13	211
3517	Mara	مارا	08	211
3518	Dar es Salaam	دار السلام	23	211
3519	Zanzibar North	زنجبار الشمالية	22	211
3520	Mbeya	مبيا	09	211
3521	Singida	سينغيدا	16	211
3522	Kigoma	كيغوما	05	211
3523	Morogoro	موروجورو	10	211
3524	Rukwa	روكوا	24	211
3525	Krym	KRYM	11	212
3526	Odes'ka Oblast'	أوديسكا أوبلاست	17	212
3527	Kharkivs'ka Oblast'	خاركيفسكا أوبلاست	07	212
3528	Poltavs'ka Oblast'	بولتافسكا أوبلاست	18	212
3529	Kyyivs'ka Oblast'	Kyyivs'ka Oblast '	13	212
3530	Zakarpats'ka Oblast'	زاكارباتسكا أوبلاست	25	212
3531	Sums'ka Oblast'	سومسكا أوبلاست	21	212
3532	Donets'ka Oblast'	دونيتسك أوبلاست	05	212
3533	Khersons'ka Oblast'	خيرسونسكا أوبلاست	08	212
3534	L'vivs'ka Oblast'	L'vivs'ka Oblast '	15	212
3535	Cherkas'ka Oblast'	تشيركاشكا أوبلاست	01	212
3536	Vinnyts'ka Oblast'	فينيتسكا أوبلاست	23	212
3537	Rivnens'ka Oblast'	ريفنينسكا أوبلاست	19	212
3538	Khmel'nyts'ka Oblast'	خميلنيتسكا أوبلاست	09	212
3539	Chernihivs'ka Oblast'	تشيرنيهيفسكا أوبلاست	02	212
3540	Dnipropetrovs'ka Oblast'	دنيبروبيتروفسكا أوبلاست	04	212
3541	Mykolayivs'ka Oblast'	ميكولاييفسكا أوبلاست	16	212
3542	Ternopil's'ka Oblast'	تيرنوبل أوكا أوبلاست	22	212
3543	Zhytomyrs'ka Oblast'	زيتوميرسكا أوبلاست	27	212
3544	Chernivets'ka Oblast'	تشيرنيفتسكا أوبلاست	03	212
3545	Luhans'ka Oblast'	لوهانسكا أوبلاست	14	212
3546	Sevastopol'	سيفاستوبول \\"	20	212
3547	Kirovohrads'ka Oblast'	كيروفوهرادسكا أوبلاست	10	212
3548	Ivano-Frankivs'ka Oblast'	ايفانو فرانكيفسكا أوبلاست	06	212
3549	Zaporiz'ka Oblast'	زابوريزكا أوبلاست	26	212
3550	Volyns'ka Oblast'	فولينسكا أوبلاست	24	212
3552	Nebbi	نيبى	58	213
3553	Katakwi	كاتاكوي	69	213
3554	Lira	الليرة	47	213
3555	Apac	اباك	26	213
3556	Kaberamaido	كابيرامايدو	80	213
3557	Arua	أروا	77	213
3558	Soroti	سوروتي	95	213
3559	Tororo	تورورو	76	213
3560	Gulu	غولو	30	213
3561	Pallisa	باليسا	60	213
3562	Pader	بادر	92	213
3563	Kumi	كومي	46	213
3564	Adjumani	أدجومانى	65	213
3565	Kotido	كوتيدو	45	213
3566	Kitgum	كيتجوم	84	213
3567	Masindi	ماسيندى	50	213
3568	Mbarara	مبارارا	52	213
3570	Bundibugyo	بونديبوجيو	28	213
3571	Nakapiripirit	ناكابيريبيريت	91	213
3572	Moroto	موروتو	88	213
3573	Moyo	مويو	72	213
3574	Mbale	مبالي	87	213
3575	Yumbe	يومبى	97	213
3576	Kapchorwa	كابشوروا	39	213
3577	Nakasongola	ناكاسونغولا	73	213
3578	Mubende	موبيندي	56	213
3579	Kisoro	كيسورو	43	213
3580	Iganga	إيغانغا	78	213
3581	Kayunga	كايونجا	83	213
3582	Mukono	موكونو	90	213
3583	Mpigi	مبيجي	89	213
3584	Kamuli	كامولي	38	213
3585	Luwero	ويرو	70	213
3586	Masaka	ماساكا	71	213
3587	Rakai	راكاي	61	213
3588	Kalangala	كالانغالا	36	213
3589	Kibale	كيبالي	41	213
3590	Bugiri	بوجيرى	66	213
3591	Wakiso	اكيسو	96	213
3592	Kiboga	كيبوجا	42	213
3593	Kampala	كمبالا	37	213
3594	Mayuge	مايوج	86	213
3595	Kyenjojo	كينجوجو	85	213
3596	Rukungiri	روكونجيري	93	213
3597	Bushenyi	بوشينى	29	213
3598	Hoima	هويما	31	213
3599	Kamwenge	كاموينج	81	213
3600	Kabarole	كابارولي	79	213
3601	Sironko	سيرونكو	94	213
3602	Kasese	كاسيس	40	213
3603	Sembabule	سيمبابول	74	213
3605	Jinja	جينجا	33	213
3606	Busia	بوسيا	67	213
3607	Ntungamo	نتنجامو	59	213
3608	Kanungu	كنونغ	82	213
3610	Alabama	ألاباما	AL	230
3611	Alaska	ألاسكا	AK	230
3612	American Samoa	ساموا الأمريكية	AS	230
3613	Arizona	أريزونا	AZ	230
3614	Arkansas	أركنساس	AR	230
3615	California	كاليفورنيا	CA	230
3616	Colorado	كولورادو	CO	230
3617	Connecticut	كونيتيكت	CT	230
3618	Delaware	ديلاوير	DE	230
3619	District of Columbia	مقاطعة كولومبيا	DC	230
3620	Florida	فلوريدا	FL	230
3621	Georgia	جورجيا	GA	230
3622	Guam	غوام	GU	230
3623	Hawaii	هاواي	HI	230
3624	Idaho	ايداهو	ID	230
3625	Illinois	إلينوي	IL	230
3626	Indiana	إنديانا	IN	230
3627	Iowa	أيوا	IA	230
3628	Kansas	كانساس	KS	230
3629	Kentucky	كنتاكي	KY	230
3630	Louisiana	لويزيانا	LA	230
3631	Maine	مين	ME	230
3632	Marshall Islands	جزر مارشال	MH	230
3633	Maryland	ماريلاند	MD	230
3634	Massachusetts	ماساتشوستس	MA	230
3635	Michigan	ميشيغان	MI	230
3636	Federated States of Micronesia	ولايات ميكرونيزيا الموحدة	FM	230
3637	Minnesota	مينيسوتا	MN	230
3638	Mississippi	ميسيسيبي	MS	230
3639	Missouri	ميسوري	MO	230
3640	Montana	مونتانا	MT	230
3641	Nebraska	نبراسكا	NE	230
3642	Nevada	نيفادا	NV	230
3643	New Hampshire	نيو هامبشاير	NH	230
3644	New Jersey	نيو جيرسي	NJ	230
3645	New Mexico	المكسيك جديدة	NM	230
3646	New York	نيويورك	NY	230
3647	North Carolina	شمال كارولينا	NC	230
3648	North Dakota	شمال داكوتا	ND	230
3649	Northern Mariana Islands	جزر مريانا الشمالية	MP	230
3650	Ohio	أوهايو	OH	230
3651	Oklahoma	أوكلاهوما	OK	230
3652	Oregon	ولاية أوريغون	OR	230
3653	Palau	بالاو	PW	230
3654	Pennsylvania	بنسلفانيا	PA	230
3655	Puerto Rico	بورتوريكو	PR	230
3656	Rhode Island	جزيرة رود	RI	230
3657	South Carolina	كارولينا الجنوبية	SC	230
3658	South Dakota	جنوب داكوتا	SD	230
3659	Tennessee	تينيسي	TN	230
3660	Texas	تكساس	TX	230
3661	Utah	يوتا	UT	230
3662	Vermont	فيرمونت	VT	230
3663	Virgin Islands	جزر العذراء	VI	230
3664	Virginia	فرجينيا	VA	230
3665	Washington	واشنطن	WA	230
3666	West Virginia	فرجينيا الغربية	WV	230
3667	Wisconsin	ولاية ويسكونسن	WI	230
3668	Wyoming	وايومنغ	WY	230
3669	Rocha	روشا	14	214
3670	Florida	فلوريدا	07	214
3671	Montevideo	مونتيفيديو	10	214
3672	Rivera	ريفيرا	13	214
3673	Cerro Largo	سيرو لارجو	03	214
3674	Tacuarembo	تاكواريمبو	18	214
3675	Lavalleja	افاييخا	08	214
3676	Treinta y Tres	Treinta ذ تريس	19	214
3677	Soriano	سوريانو	17	214
3678	Durazno	دورازنو	05	214
3679	Canelones	كانيلونز	02	214
3680	Flores	فلوريس	06	214
3681	Maldonado	مالدونادو	09	214
3682	Salto	سالتو	15	214
3683	Rio Negro	ريو نيغرو	12	214
3684	Artigas	أرتيجاس	01	214
3685	Paysandu	بايساندو	11	214
3686	Colonia	كولونيا	04	214
3687	San Jose	سان خوسيه	16	214
3688	Khorazm	Khorazm	05	215
3689	Qashqadaryo	قاشقادري	08	215
3690	Samarqand	سمرقند	10	215
3691	Andijon	أنديجان	01	215
3692	Jizzax	جيزاكس	15	215
3693	Toshkent	طشقند	14	215
3694	Surkhondaryo	Surkhondaryo	12	215
3695	Qoraqalpoghiston	Qoraqalpoghiston	09	215
3696	Nawoiy	Nawoiy	07	215
3698	Namangan	نامانجان	06	215
3699	Farghona	Farghona	03	215
3700	Bukhoro	Bukhoro	02	215
3701	Toshkent	طشقند	13	215
3703	Charlotte	شارلوت	01	216
3704	Saint George	القديس جورج	04	216
3705	Grenadines	غرينادين	06	216
3706	Saint Patrick	سانت باتريك	05	216
3707	Saint Andrew	القديس أندرو	02	216
3708	Saint David	القديس داود	03	216
3709	Falcon	صقر	11	217
3710	Apure	محض	03	217
3711	Bolivar	بوليفار	06	217
3712	Tachira	تاكيرا	20	217
3713	Miranda	ميراندا	15	217
3714	Guarico	غواريكو	12	217
3715	Anzoategui	انزواتيجي	02	217
3716	Nueva Esparta	نويفا اسبارتا	17	217
3717	Portuguesa	بورتوغيزا	18	217
3718	Sucre	سوكري	19	217
3719	Barinas	باريناس	05	217
3720	Lara	لارا	13	217
3721	Zulia	سوليا	23	217
3722	Merida	ميريدا	14	217
3723	Carabobo	كارابوبو	07	217
3724	Cojedes	كوجيديس	08	217
3725	Aragua	أراغوا	04	217
3726	Yaracuy	ياراكوي	22	217
3727	Amazonas	أمازوناس	01	217
3728	Monagas	موناجاس	16	217
3729	Trujillo	تروخيو	21	217
3730	Vargas	فارغاس	26	217
3732	Delta Amacuro	دلتا أماكورو	09	217
3733	Distrito Federal	وفي مقاطعة الاتحادية	25	217
3734	Dependencias Federales	Dependencias Federales	24	217
3742	Thanh Hoa	ثانه هوا	34	220
3745	Quang Nam	كوانج نام	84	220
3746	Son La	الابن لا	32	220
3751	Tay Ninh	تاي نينه	33	220
3753	Thai Binh	التايلانديه بينه	35	220
3754	Kien Giang	كين جيانج	21	220
3755	Dong Thap	دونج ثاب	09	220
3761	Soc Trang	سوك ترانج	65	220
3764	Ben Tre	بن تري	03	220
3765	Ho Chi Minh	هوشي منه	20	220
3766	Tra Vinh	ترا فينه	67	220
3767	Hai Phong	هاي فونج	13	220
3768	Cao Bang	تساو بانج	05	220
3769	An Giang	آن جيانج	01	220
3772	Nghe An	نجى آن	58	220
3773	Gia Lai	جيا لاي	49	220
3774	Lam Dong	لام دونغ	23	220
3775	Binh Dinh	بينه دنه	46	220
3776	Binh Phuoc	بينه فووك	76	220
3777	Lang Son	لانج سون	39	220
3778	Tien Giang	تيان جيانج	37	220
3779	Long An	طويل	24	220
3780	Ninh Thuan	نينه ثوان	60	220
3781	Quang Ninh	كوانج نينه	30	220
3782	Bac Lieu	باك ليو	73	220
3783	Ca Mau	كا ماو	77	220
3786	Binh Duong	بينه دونغ	75	220
3787	Binh Thuan	بينه ثوان	47	220
3788	Vinh Long	فينه لونج	69	220
3789	Dong Nai	دونج ناي	43	220
3791	Bac Kan	باك اساسه	72	220
3792	Bac Giang	باك جيانج	71	220
3793	Thua Thien-Hue	ثوا ثين هوي	66	220
3794	Bac Ninh	باك نينه	74	220
3795	Ha Giang	ها جيانج	50	220
3796	Tuyen Quang	توين كوانج	68	220
3797	Thai Nguyen	التايلاندية نغوين	85	220
3798	Da Nang	دا نانج	78	220
3799	Khanh Hoa	خانه هوا	54	220
3800	Ba Ria-Vung Tau	با ريا فونج تاو	45	220
3801	Quang Ngai	كوانج نجاي	63	220
3803	Ha Nam	ها نام	80	220
3804	Phu Yen	فو ين	61	220
3805	Quang Binh	كوانغ بينه	62	220
3806	Phu Tho	فو ثو	83	220
3807	Quang Tri	كوانغ تري	64	220
3808	Ha Tinh	ها تنه	52	220
3809	Kon Tum	كون توم	55	220
3811	Yen Bai	ين باي	70	220
3812	Ninh Binh	نينه بينه	59	220
3813	Nam Dinh	نام دينه	82	220
3814	Hai Duong	هاي دونج	79	220
3815	Ha Noi	ها نوي	44	220
3816	Hoa Binh	هوا بينه	53	220
3817	Hung Yen	هونغ ين	81	220
3818	Vinh Phuc	فينه فوك	86	220
3819	Sanma	سانما	13	221
3820	Aoba	أوبا	06	221
3821	Shepherd	الراعي	14	221
3822	Malakula	Malakula	10	221
3823	Pentecote	Pentecote	12	221
3824	Torba	توربا	07	221
3825	Efate	إيفات	08	221
3826	Tafea	تافيا	15	221
3827	Ambrym	Ambrym	05	221
3828	Epi	برنامج التحصين الموسع	09	221
3829	Paama	Paama في	11	221
3832	Lahij	لحج	06	224
3833	Sa'dah	صعدة	15	224
3834	Al Hudaydah	الحديدة	08	224
3835	Ma'rib	مأرب	14	224
3836	Al Bayda'	البيضاء	07	224
3837	Dhamar	ذمار	11	224
3838	San'a'	صنعاء'	16	224
3839	Al Mahrah	المهرة	03	224
3840	Hadramawt	حضرموت	04	224
3841	Taizz	تعز	17	224
3842	Hajjah	حجة	12	224
3843	Abyan	أبين	01	224
3844	Ibb	إب	13	224
3845	Adan	عدن	02	224
3846	Al Mahwit	المحويت	10	224
3847	Al Jawf	الجوف	09	224
3850	Western Cape	الرأس الغربي	11	226
3851	Eastern Cape	الرأس الشرقي	05	226
3852	Mpumalanga	مبومالانغا	07	226
3853	Free State	دولة حرة	03	226
3854	North-West	الشمال الغربي	10	226
3855	Limpopo	ليمبوبو	09	226
3856	KwaZulu-Natal	كوازولو ناتال	02	226
3857	North-Western Province	المنطقة الشمالية الغربية	01	226
3858	Gauteng	غوتنغ	06	226
3859	Northern Cape	الرأس الشمالي	08	226
3861	Southern	جنوبي	07	227
3862	North-Western	الشمالية الغربية	06	227
3863	Northern	شمالي	05	227
3864	Western	الغربي	01	227
3865	Eastern	الشرقية	03	227
3866	Copperbelt	حزام النحاس	08	227
3867	Luapula	وابولا	04	227
3868	Central	وسط	02	227
3869	Lusaka	لوساكا	09	227
3883	Matabeleland North	ماتابيللاند الشمالية	06	229
3884	Mashonaland East	ماشونالاند الشرقية	04	229
3885	Mashonaland Central	ماشونالاند الوسطى	03	229
3886	Matabeleland South	ماتابيليلاند الجنوبية	07	229
3888	Masvingo	ماسفينغو	08	229
\.


--
-- Data for Name: countries; Type: TABLE DATA; Schema: public; Owner: mis_user
--

COPY public.countries (country_id, name_ar, name_en, code) FROM stdin;
0	اخرى	Other	0
1	أندورا	Andorra	ad
2	الإمارات العربية المتحدة	United Arab Emirates	ae
3	أفغانستان	Afghanistan	af
4	أنتيغوا وبربودا	Antigua and Barbuda	ag
5	أنغيلا	Anguilla	ai
6	ألبانيا	Albania	al
7	أرمينيا	Armenia	am
8	جزر الأنتيل الهولندية	Netherlands Antilles	an
9	أنغولا	Angola	ao
10	الأرجنتين	Argentina	ar
11	النمسا	Austria	at
12	أستراليا	Australia	au
13	أروبا	Aruba	aw
14	أذربيجان	Azerbaijan	az
15	البوسنة والهرسك	Bosnia and Herzegovina	ba
16	بربادوس	Barbados	bb
17	بنغلاديش	Bangladesh	bd
18	بلجيكا	Belgium	be
19	بوركينا فاسو	Burkina Faso	bf
20	بلغاريا	Bulgaria	bg
21	البحرين	Bahrain	bh
22	بوروندي	Burundi	bi
23	بنين	Benin	bj
24	برمودا	Bermuda	bm
25	بروناي دار السلام	Brunei Darussalam	bn
26	بوليفيا	Bolivia	bo
27	البرازيل	Brazil	br
28	الباهاما	Bahamas	bs
29	بوتان	Bhutan	bt
30	بوتسوانا	Botswana	bw
31	روسيا البيضاء	Belarus	by
32	بليز	Belize	bz
33	كندا	Canada	ca
34	جزر كوكوس (كيلينغ)	Cocos (Keeling) Islands	cc
35	جمهورية الكونغو الديموقراطية	Democratic Republic of the Congo	cd
36	جمهورية افريقيا الوسطى	Central African Republic	cf
37	الكونغو	Congo	cg
38	سويسرا	Switzerland	ch
39	ساحل العاج (ساحل العاج)	Cote D'Ivoire (Ivory Coast)	ci
40	جزر كوك	Cook Islands	ck
41	تشيلي	Chile	cl
42	الكاميرون	Cameroon	cm
43	الصين	China	cn
44	كولومبيا	Colombia	co
45	كوستا ريكا	Costa Rica	cr
46	كوبا	Cuba	cu
47	الرأس الأخضر	Cape Verde	cv
48	جزيرة الكريسماس	Christmas Island	cx
49	قبرص	Cyprus	cy
50	جمهورية التشيك	Czech Republic	cz
51	ألمانيا	Germany	de
52	جيبوتي	Djibouti	dj
53	الدنمارك	Denmark	dk
54	دومينيكا	Dominica	dm
55	جمهورية الدومنيكان	Dominican Republic	do
56	الجزائر	Algeria	dz
57	الإكوادور	Ecuador	ec
58	استونيا	Estonia	ee
59	مصر	Egypt	eg
60	الصحراء الغربية	Western Sahara	eh
61	إريتريا	Eritrea	er
62	إسبانيا	Spain	es
63	أثيوبيا	Ethiopia	et
64	فنلندا	Finland	fi
65	فيجي	Fiji	fj
66	جزر فوكلاند (مالفيناس)	Falkland Islands (Malvinas)	fk
67	ولايات ميكرونيزيا الموحدة	Federated States of Micronesia	fm
68	جزر صناعية	Faroe Islands	fo
69	فرنسا	France	fr
70	الغابون	Gabon	ga
71	بريطانيا العظمى (المملكة المتحدة)	Great Britain (UK)	gb
72	غرينادا	Grenada	gd
73	جورجيا	Georgia	ge
74	غيانا الفرنسية	French Guiana	gf
75	لا شيء	NULL	gg
76	غانا	Ghana	gh
77	جبل طارق	Gibraltar	gi
78	الأرض الخضراء	Greenland	gl
79	غامبيا	Gambia	gm
80	غينيا	Guinea	gn
81	جوادلوب	Guadeloupe	gp
82	غينيا الإستوائية	Equatorial Guinea	gq
83	اليونان	Greece	gr
84	جورجيا وجزر ساندويتش	S. Georgia and S. Sandwich Islands	gs
85	غواتيمالا	Guatemala	gt
86	غينيا بيساو	Guinea-Bissau	gw
87	غيانا	Guyana	gy
88	هونغ كونغ	Hong Kong	hk
89	هندوراس	Honduras	hn
90	كرواتيا (هرفاتسكا)	Croatia (Hrvatska)	hr
91	هايتي	Haiti	ht
92	اليونان	Hungary	hu
93	أندونيسيا	Indonesia	id
94	أيرلندا	Ireland	ie
96	الهند	India	in
97	العراق	Iraq	iq
98	إيران	Iran	ir
99	أيسلندا	Iceland	is
100	إيطاليا	Italy	it
101	جامايكا	Jamaica	jm
102	الأردن	Jordan	jo
103	اليابان	Japan	jp
104	كينيا	Kenya	ke
105	قرغيزستان	Kyrgyzstan	kg
106	كمبوديا	Cambodia	kh
107	كيريباس	Kiribati	ki
108	جزر القمر	Comoros	km
109	سانت كيتس ونيفيس	Saint Kitts and Nevis	kn
110	كوريا الشمالية	Korea (North)	kp
111	كوريا، جنوب)	Korea (South)	kr
112	الكويت	Kuwait	kw
113	جزر كايمان	Cayman Islands	ky
114	كازاخستان	Kazakhstan	kz
115	لاوس	Laos	la
116	لبنان	Lebanon	lb
117	القديسة لوسيا	Saint Lucia	lc
118	ليختنشتاين	Liechtenstein	li
119	سيريلانكا	Sri Lanka	lk
120	ليبيريا	Liberia	lr
121	ليسوتو	Lesotho	ls
122	ليتوانيا	Lithuania	lt
123	لوكسمبورغ	Luxembourg	lu
124	لاتفيا	Latvia	lv
125	ليبيا	Libya	ly
126	المغرب	Morocco	ma
127	موناكو	Monaco	mc
128	مولدوفا	Moldova	md
129	مدغشقر	Madagascar	mg
130	جزر مارشال	Marshall Islands	mh
131	مقدونيا	Macedonia	mk
132	مالي	Mali	ml
133	ميانمار	Myanmar	mm
134	منغوليا	Mongolia	mn
135	ماكاو	Macao	mo
136	جزر مريانا الشمالية	Northern Mariana Islands	mp
137	مارتينيك	Martinique	mq
138	موريتانيا	Mauritania	mr
139	مونتسيرات	Montserrat	ms
140	مالطا	Malta	mt
141	موريشيوس	Mauritius	mu
142	جزر المالديف	Maldives	mv
143	مالاوي	Malawi	mw
144	المكسيك	Mexico	mx
145	ماليزيا	Malaysia	my
146	موزمبيق	Mozambique	mz
147	ناميبيا	Namibia	na
148	كاليدونيا الجديدة	New Caledonia	nc
149	النيجر	Niger	ne
150	جزيرة نورفولك	Norfolk Island	nf
151	نيجيريا	Nigeria	ng
152	نيكاراغوا	Nicaragua	ni
153	هولندا	Netherlands	nl
154	النرويج	Norway	no
155	نيبال	Nepal	np
156	ناورو	Nauru	nr
157	نيوي	Niue	nu
158	نيوزيلندا (اوتياروا)	New Zealand (Aotearoa)	nz
159	سلطنة عمان	Oman	om
160	بناما	Panama	pa
161	بيرو	Peru	pe
162	بولينيزيا الفرنسية	French Polynesia	pf
163	بابوا غينيا الجديدة	Papua New Guinea	pg
164	الفلبين	Philippines	ph
165	باكستان	Pakistan	pk
166	بولندا	Poland	pl
167	سانت بيير وميكلون	Saint Pierre and Miquelon	pm
168	بيتكيرن	Pitcairn	pn
169	الأراضي الفلسطينية	Palestinian Territory	ps
170	البرتغال	Portugal	pt
171	بالاو	Palau	pw
172	باراغواي	Paraguay	py
173	دولة قطر	Qatar	qa
174	جمع شمل	Reunion	re
175	رومانيا	Romania	ro
176	الاتحاد الروسي	Russian Federation	ru
177	رواندا	Rwanda	rw
178	المملكة العربية السعودية	Saudi Arabia	sa
179	جزر سليمان	Solomon Islands	sb
180	سيشيل	Seychelles	sc
181	سودان	Sudan	sd
182	السويد	Sweden	se
183	سنغافورة	Singapore	sg
184	سانت هيلانة	Saint Helena	sh
185	سلوفينيا	Slovenia	si
186	سفالبارد وجان مايان	Svalbard and Jan Mayen	sj
187	سلوفاكيا	Slovakia	sk
188	سيرا ليون	Sierra Leone	sl
189	سان مارينو	San Marino	sm
190	السنغال	Senegal	sn
191	الصومال	Somalia	so
192	سورينام	Suriname	sr
193	ساو تومي وبرنسيبي	Sao Tome and Principe	st
194	السلفادور	El Salvador	sv
195	سوريا	Syria	sy
196	سوازيلاند	Swaziland	sz
197	جزر تركس وكايكوس	Turks and Caicos Islands	tc
198	تشاد	Chad	td
199	المناطق الجنوبية لفرنسا	French Southern Territories	tf
200	ليذهب	Togo	tg
201	تايلاند	Thailand	th
202	طاجيكستان	Tajikistan	tj
203	توكيلاو	Tokelau	tk
204	تركمانستان	Turkmenistan	tm
205	تونس	Tunisia	tn
206	تونغا	Tonga	to
207	ديك رومي	Turkey	tr
208	ترينداد وتوباغو	Trinidad and Tobago	tt
209	توفالو	Tuvalu	tv
210	تايوان	Taiwan	tw
211	تنزانيا	Tanzania	tz
212	أوكرانيا	Ukraine	ua
213	أوغندا	Uganda	ug
214	أوروغواي	Uruguay	uy
215	أوزبكستان	Uzbekistan	uz
216	سانت فنسنت وجزر غرينادين	Saint Vincent and the Grenadines	vc
217	فنزويلا	Venezuela	ve
218	جزر العذراء البريطانية)	Virgin Islands (British)	vg
219	جزر فيرجن (الولايات المتحدة)	Virgin Islands (U.S.)	vi
220	فيتنام	Viet Nam	vn
221	فانواتو	Vanuatu	vu
222	واليس وفوتونا	Wallis and Futuna	wf
223	ساموا	Samoa	ws
224	اليمن	Yemen	ye
225	مايوت	Mayotte	yt
226	جنوب أفريقيا	South Africa	za
227	زامبيا	Zambia	zm
228	زائير (سابقة)	Zaire (former)	zr
229	زيمبابوي	Zimbabwe	zw
230	الولايات المتحدة	United States of America	us
\.


--
-- Name: cities_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mis_user
--

SELECT pg_catalog.setval('public.cities_id_seq', 1, false);


--
-- Name: countries_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mis_user
--

SELECT pg_catalog.setval('public.countries_id_seq', 1, false);


--
-- Name: cities cities_pkey; Type: CONSTRAINT; Schema: public; Owner: mis_user
--

ALTER TABLE ONLY public.cities
    ADD CONSTRAINT cities_pkey PRIMARY KEY (city_id);


--
-- Name: countries countries_pkey; Type: CONSTRAINT; Schema: public; Owner: mis_user
--

ALTER TABLE ONLY public.countries
    ADD CONSTRAINT countries_pkey PRIMARY KEY (country_id);


--
-- Name: cities cities_country_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mis_user
--

ALTER TABLE ONLY public.cities
    ADD CONSTRAINT cities_country_id_fkey FOREIGN KEY (country_id) REFERENCES public.countries(country_id);


--
-- PostgreSQL database dump complete
--

