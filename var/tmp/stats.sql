select
    user,
    count(*) as messages
from discord_chat_messages
where
    created_at > '2021-07-29 00:00:00' and
    channel not in (
        'team-room',
        'hero-room',
        'oof-topic',
        'command-center',
        'moderator-report',
        'gaming',
        'music',
        'bot-playground'
    ) and
    discord_id in (
        '252862670842232832',
        '431464792075665418',
        '98488345952256000',
        '460172222489952266',
        '473160828502409217',
        '274618567977205761',
        '187677490452496394',
        '449274804651032577',
        '342099904056786945',
        '186436642356068352',
        '245697230982479872',
        '381632413010231309',
        '173679469872152576'
    )
group by discord_id
order by messages desc;


select
    user,
    count(*) as messages
from discord_chat_messages
where
    created_at > '2021-07-29 00:00:00' and
    channel not in (
        'team-room',
        'hero-room',
        'oof-topic',
        'command-center',
        'moderator-report',
        'gaming',
        'music',
        'bot-playground'
    ) and
    discord_id in (
        '319509382889209866',
        '681375864042160128',
        '222005750598205440',
        '243412893234757632',
        '532835388448833556',
        '271357207180738563',
        '406634590325964801',
        '276380118761340928',
        '563228793704022038',
        '496790880548814858',
        '158250066417549312',
        '266140088138858496',
        '710952300209766410',
        '197774061315686400',
        '536269399783505950'
    )
group by discord_id
order by messages desc;
