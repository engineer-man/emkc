select
    c1.comment_id as `c1_comment_id`,
    c1.user_id as `c1_user_id`,
    c1.comment as `c1_comment`,
    c1.score as `c1_score`,
    c1.created_at as `c1_created_at`,
    c1.username as `c1_username`,
    c2.comment_id as `c2_comment_id`,
    c2.base_id as `c2_base_id`,
    c2.parent_id as `c2_parent_id`,
    c2.user_id as `c2_user_id`,
    c2.comment as `c2_comment`,
    c2.depth as `c2_depth`,
    c2.score as `c2_score`,
    c2.created_at as `c2_created_at`,
    u.username as `c2_username`
from (
    select
        c.comment_id as comment_id,
        c.user_id as user_id,
        c.comment as comment,
        c.score as score,
        c.created_at as created_at,
        u.username as username
    from comments c
    left join users u on c.user_id = u.user_id
    left join comment_votes cv on c.comment_id = cv.comment_id and c.user_id = cv.user_id
    where c.question_id = __question_id__ and c.parent_id is null
    order by c.score desc
    limit __limit__
) c1
left join comments c2 on c1.comment_id = c2.base_id
left join users u on c2.user_id = u.user_id
left join comment_votes cv on c2.comment_id = cv.comment_id and c2.user_id = cv.user_id
order by c1.score desc, c2.depth, c2.score desc;
