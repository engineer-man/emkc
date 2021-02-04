select
    user,
    count(*) as messages
from discord_chat_messages
where
    created_at > '2020-12-31 00:00:00' and
    channel not in (
        'off-topic',
        'team-room',
        'oof-topic',
        'command-center',
        'gaming'
    ) and
    discord_id in (
        '252862670842232832',
        '98488345952256000',
        '460172222489952266',
        '473160828502409217',
        '274618567977205761',
        '187677490452496394',
        '449274804651032577',
        '342099904056786945',
        '186436642356068352',
        '245697230982479872',
        '381632413010231309'
    )
group by discord_id
order by messages desc;
