up:
drop trigger question_vote_insert_trigger;
delimiter $
create trigger question_vote_insert_trigger after insert on question_votes for each row begin
    update questions set score = score + NEW.value where question_id = NEW.question_id;
end$
delimiter ;

drop trigger question_vote_delete_trigger;
delimiter $
create trigger question_vote_delete_trigger after delete on question_votes for each row begin
    update questions set score = score - OLD.value where question_id = OLD.question_id;
end$
delimiter ;

drop trigger comment_vote_insert_trigger;
delimiter $
create trigger comment_vote_insert_trigger after insert on comment_votes for each row begin
    update comments set score = score + NEW.value where comment_id = NEW.comment_id;
end$
delimiter ;

drop trigger comment_vote_delete_trigger;
delimiter $
create trigger comment_vote_delete_trigger after delete on comment_votes for each row begin
    update comments set score = score - OLD.value where comment_id = OLD.comment_id;
end$
delimiter ;

drop trigger comment_insert_trigger;
delimiter $
create trigger comment_insert_trigger after insert on comments for each row begin
    update questions set comments = comments + 1 where question_id = NEW.question_id;
end$
delimiter ;

drop trigger comment_delete_trigger;
delimiter $
create trigger comment_delete_trigger after delete on comments for each row begin
    update questions set comments = comments - 1 where question_id = OLD.question_id;
end$
delimiter ;

down:
