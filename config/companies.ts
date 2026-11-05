export const companies = [
 {name:'Piovation GMBH', aliases:['Piovation GMBH','Piovation'], href:'https://www.piovation.com/', logo:'/companies/piovation.png', logoClass:'bg-[#090909] p-1.5', badgeClass:'text-stone-700 bg-stone-200/70 dark:text-stone-300 dark:bg-stone-500/15'},
 {name:'RabbitLoader', aliases:['Rabbitloader','RabbitLoader','Rabbitloader (Yogi Network)'], href:'https://rabbitloader.com/', logo:'/companies/rabbitloader.png', logoClass:'bg-[#090929] p-1', badgeClass:'text-blue-700 bg-blue-100/70 dark:text-blue-300 dark:bg-blue-500/10'},
 {name:'Wizwack', aliases:['Wizwack'], href:'/work#full-stack-developer-intern-at-wizwack', logo:'/companies/wizwack.png', logoClass:'bg-[#160b20] p-1', badgeClass:'text-fuchsia-700 bg-fuchsia-100/70 dark:text-fuchsia-300 dark:bg-fuchsia-500/10'},
] as const;
export const getCompany = (name:string) => companies.find(c=>c.aliases.some(alias=>alias.toLowerCase()===name.toLowerCase()));
